const { getOptions } = require('./config')

async function ImageBase64 (bundler) {
  const { exts } = await getOptions()
  exts.forEach(ext => {
    bundler.addAssetType(ext, require.resolve('./asset.js'))
  })
}

module.exports = ImageBase64
