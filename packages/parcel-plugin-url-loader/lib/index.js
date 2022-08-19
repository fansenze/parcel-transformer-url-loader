const path = require('path')
const collection = require('./collection')
const { getOptions } = require('./config')
const { unlink } = require('./utils')

module.exports = async function init (bundler) {
  const { exts } = await getOptions()

  exts.forEach(ext => {
    bundler.addAssetType(ext, require.resolve('./assets/ImageAsset.js'))
  })

  bundler.addAssetType('css', require.resolve('./assets/CSSAsset.js'))

  bundler.on('bundled', async function () {
    const { outDir, production } = this.options
    if (!production) return
    const handlerAssets = collection.get()
    const outputs = []
    handlerAssets.forEach((v, hashname) => {
      const filename = this.bundleNameMap.get(hashname)
      outputs.push(
        path.resolve(outDir, filename)
      )
    })
    await Promise.all(
      outputs.map(e => unlink(e))
    )
  })
}
