const url = require('url')
const path = require('path')
const { Asset } = require('parcel-bundler')
const { getOptions } = require('../config')
const { read, base64 } = require('../utils')
const collection = require('../collection')

class ImageAsset extends Asset {
  constructor(name, options) {
    super(name, options)
  }

  async generate () {
    let value
    const { limit } = await getOptions()
    const file = await read(this.name, 'binary')
    const hashname = this.generateBundleName()

    if (file.length <= limit) {
      value = await base64(file, this.name)
      collection.set(hashname, {
        basename: this.basename, path: this.name
      })
    } else {
      value = url.resolve(
        path.join(this.options.publicURL, hashname),
        ''
      )
    }

    return [
      {
        type: 'js',
        value: `module.exports=${JSON.stringify(value)};`
      }
    ]
  }
}

module.exports = ImageAsset
