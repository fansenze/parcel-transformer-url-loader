const { getOptions } = require('./config')

async function init (bundler) {
  const { exts } = await getOptions()

  exts.forEach(ext => {
    bundler.addAssetType(ext, require.resolve('./assets/ImageAsset.js'))
  })
  bundler.addAssetType('css', require.resolve('./assets/CSSAsset.js'))
}

module.exports = init
