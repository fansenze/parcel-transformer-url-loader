const path = require('path')
const CSSAsset = require(`parcel-bundler/${parseInt(process.versions.node, 10) < 8 ? 'lib' : 'src'}/assets/CSSAsset`)
const { base64, read } = require('../utils')
const { getOptions } = require('../config')
const collection = require('../collection')

module.exports = class extends CSSAsset {
  constructor(name, options) {
    super(name, options)
  }

  async postProcess (generated) {
    const css = generated.find(e => e.type === 'css')
    if (css) {
      const { exts, limit } = await getOptions()
      for (let i of this.dependencies) {
        const [key, val] = i
        const { name, resolved } = val
        const basename = path.basename(name)
        const extname = path.extname(basename).replace('.', '')
        if (exts.includes(extname)) {
          const file = await read(resolved, 'binary')
          if (file.length <= limit) {
            const hashname = this.generateBundleName.call({
              relativeName: basename,
              type: extname
            })
            const regexp = new RegExp(hashname, 'g')
            collection.set(hashname, { basename, path: resolved })
            const base64str = await base64(file, basename)
            css.value = css.value.replace(regexp, base64str)
          }
        }
      }
    }
    return generated
  }
}
