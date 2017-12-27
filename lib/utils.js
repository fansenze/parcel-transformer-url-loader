const { readFileSync } = require('fs')
const { resolve } = require('path')

const r = path => resolve(__dirname, path)

const read = (filePath, encoding = 'utf-8') => readFileSync(filePath, { encoding })

exports.r = r
exports.read = read
