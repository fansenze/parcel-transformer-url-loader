const path = require('path')
const { read } = require('./utils')

const ProjectRootPath = path.resolve(__dirname, '../../../')

const ParcelrcPath = ProjectRootPath + '/.parcelrc'

const objectKey = 'url-loader'

const defaultOptions = {
  exts: ['jpg', 'jpeg', 'png', 'gif', 'svg'],
  limit: 10240
}

const getOptions = (function () {
  let options = void 0
  return async () => {
    if (!options) {
      try {
        const file = await read(ParcelrcPath, 'utf8')
        const rc = JSON.parse(file)[objectKey]
        options = Object.assign(defaultOptions, rc)
      } catch (err) {
        options = defaultOptions
      }
    }
    return options
  }
})()

exports.ProjectRootPath = ProjectRootPath
exports.ParcelrcPath = ParcelrcPath
exports.getOptions = getOptions
