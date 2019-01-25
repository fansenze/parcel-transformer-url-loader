const { r, read } = require('./utils')

const ProjectRootPath = r('../../../')

const ParcelrcPath = ProjectRootPath + '/.parcelrc'

const objectKey = 'url-loader'

const defaultOptions = {
  exts: ['jpg', 'jpeg', 'png', 'gif'],
  limit: 10240
}

let options = void 0

const getOptions = () => {
  if (!options) {
    try {
      const rc = JSON.parse(
        read(ParcelrcPath)
      )[objectKey]
      options = Object.assign(defaultOptions, rc)
    } catch (err) {
      options = defaultOptions
    }
  }
  return options
}

exports.ProjectRootPath = ProjectRootPath
exports.ParcelrcPath = ParcelrcPath
exports.getOptions = getOptions
