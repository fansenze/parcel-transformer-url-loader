const { readFile } = require('fs')
const { resolve } = require('path')

const r = path => resolve(__dirname, path)

const read = (filePath, encoding = 'utf-8') => (
  new Promise((resolve, reject) => {
    readFile(filePath, encoding, function (err, data) {
      if (err) reject(err)
      else resolve(data)
    })
  })
)

exports.r = r
exports.read = read
