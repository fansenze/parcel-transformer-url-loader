const mime = require('mime')
const path = require('path')
const fs = require('fs')
const util = require('util')

const read = util.promisify(fs.readFile)

const write = util.promisify(fs.writeFile)

const unlink = util.promisify(fs.unlink)

const base64 = async (file, name) => {
  const encoding = 'binary'
  if (path.isAbsolute(file)) {
    file = await read(file, encoding)
  }
  const mimetype = mime.getType(name)
  const buffer = Buffer.from(file, encoding)
  return `data:${mimetype || ''};base64,${buffer.toString('base64')}`
}

module.exports = {
  read,
  write,
  unlink,
  base64
}
