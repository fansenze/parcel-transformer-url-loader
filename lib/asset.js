const url = require('url')
const path = require('path')
const mime = require('mime')
const JSAsset = require(`parcel-bundler/${parseInt(process.versions.node, 10) < 8 ? 'lib' : 'src'}/assets/JSAsset`)
const { getOptions } = require('./config')
const { read } = require('./utils')

class ImageAsset extends JSAsset {
  constructor(...props) {
    super(...props)
    this.type = path.extname(this.name).slice(1)
  }

  async load () {
    const { limit } = getOptions()
    const file = read(this.name, 'binary')

    if (file.length <= limit) {
      const mimetype = mime.getType(this.name)
      const bf = Buffer.from(file, 'binary')
      return `module.exports = "${`data:${mimetype};base64,${bf.toString('base64')}`}";`
    }

    const pathToAsset = url.resolve(
      path.join(this.options.publicURL, this.generateBundleName()),
      ''
    )

    return `module.exports="${pathToAsset}";`
  }

  pretransform () {}
  transform () {}
}

module.exports = ImageAsset
