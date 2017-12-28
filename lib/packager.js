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
    for (let dep of asset.dependencies.values()) {
      let mod = asset.depAssets.get(dep.name)

      // For dynamic dependencies, list the child bundles to load along with the module id
      if (dep.dynamic && this.bundle.childBundles.has(mod.parentBundle)) {
        let bundles = [basename(mod.parentBundle.name)]
        for (let child of mod.parentBundle.siblingBundles.values()) {
          if (!child.isEmpty) {
            bundles.push(basename(child.name))
          }
        }

        bundles.push(mod.id)
        deps[dep.name] = bundles
      } else {
        deps[dep.name] = this.dedupe.get(mod.generated.js) || mod.id
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

    await this.writeModule(asset.id, asset.generated.js, deps)
  }
}

module.exports = Packager
