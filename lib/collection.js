
class Collection {
  constructor() {
    this.map = new Map()
  }
  
  get (key) {
    return key ? this.map.get(key) : this.map
  }

  set (key, value) {
    return this.map.set(key, value)
  }
}

module.exports = new Collection()
