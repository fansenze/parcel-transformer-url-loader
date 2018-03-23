const url = require('url')
const { basename, extname, parse, join, dirname } = require('path')
const JSPackager = require('parcel-bundler/src/packagers/JSPackager')
const { read, write } = require('./utils')
const { getOptions } = require('./config')

class Packager extends JSPackager {
  async addAsset (asset) {
    if (this.dedupe.has(asset.generated.js)) {
      return
    }

    // Don't dedupe when HMR is turned on since it messes with the asset ids
    if (!this.options.hmr) {
      this.dedupe.set(asset.generated.js, asset.id)
    }

    let deps = {}
    for (let [dep, mod] of asset.depAssets) {
      // For dynamic dependencies, list the child bundles to load along with the module id
      if (dep.dynamic && this.bundle.childBundles.has(mod.parentBundle)) {
        let bundles = [this.getBundleSpecifier(mod.parentBundle)];
        for (let child of mod.parentBundle.siblingBundles) {
          if (!child.isEmpty) {
            bundles.push(this.getBundleSpecifier(child));
            this.bundleLoaders.add(child.type);
          }
        }

        bundles.push(mod.id);
        deps[dep.name] = bundles;
        this.bundleLoaders.add(mod.type);
      } else {
        deps[dep.name] = this.dedupe.get(mod.generated.js) || mod.id;

        // If the dep isn't in this bundle, add it to the list of external modules to preload.
        // Only do this if this is the root JS bundle, otherwise they will have already been
        // loaded in parallel with this bundle as part of a dynamic import.
        if (
          !this.bundle.assets.has(mod) &&
          (!this.bundle.parentBundle || this.bundle.parentBundle.type !== 'js')
        ) {
          this.externalModules.add(mod);
          this.bundleLoaders.add(mod.type);
        }
      }
    }

    const { exts, limit } = await getOptions()
    const ext = extname(asset.name).slice(1)

    if (exts.includes(ext)) {
      const contents = read(asset.name, 'binary')

      if (contents.length > limit) {
        // Use the bundle name if this is the entry asset, otherwise generate one.
        let name = this.bundle.name
        if (asset !== this.bundle.entryAsset) {
          name = url.resolve(
            join(dirname(this.bundle.name), asset.generateBundleName()),
            ''
          )
        }

        const { dir, name: fileName } = parse(name)

        await write(join(dir, `${fileName}.${ext}`), contents, 'binary')
      }
    }

    this.bundle.addOffset(asset, this.lineOffset)
    await this.writeModule(
      asset.id,
      asset.generated.js,
      deps,
      asset.generated.map
    )
  }
}

module.exports = Packager
