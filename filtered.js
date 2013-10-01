var E = require('emmitt')
module.exports = FilteredArray

function FilteredArray(arr, fun){
  var self = this
  this.fun = fun
  this.source = arr
  this.indices = []
  this.$onItemChange = function(){ self._onItemChange(this) }
  arr.forEach(function(item, idx){
    if (fun(item)){
      self.indices.push(idx)
    }
    if (typeof item !== 'object') return
    E.on(item, 'change', self.$onItemChange)
  })
  this.$onInsert = function(idx, item){
    self._onInsert(idx, item)
  }
  E.on(this.source, 'insert', this.$onInsert)
  this.$onRemove = function(idx, item){
    self._onRemove(idx, item)
  }
  E.on(this.source, 'remove', this.$onRemove)
}

FilteredArray.prototype = {
  size: function(){
    return this.indices.length
  },
  get: function(i){
    return this.source.get(this.indices[i])
  },
  indexOf: function(obj){
    for (var i = 0; i < this.indices.length; i++){
      if (this.get(i) === obj) return i
    }
    return -1
  },
  contains: function(obj){
    if (!this.fun(obj)) return false
    return this.indexOf(obj) !== -1
  },
  add: function(){
    throw new Error('Cannot add to a filtered array')
  },
  remove: function(){
    throw new Error('Cannot removed from a filtered array')
  },
  insert: function(){
    throw new Error('Cannot insert into a filtered array')
  },
  clear: function(){
    throw new Error('Cannot clean a filtered array')
  },
  _onInsert: function(idx, item){
    if (this.fun(item)){
      this._insert(idx, item)
    }
  },
  _onRemove: function(idx, item){
    if (this.fun(item)){
      this._remove(idx, item)
    }
  },
  _onItemChange: function(item){
    var idx = this.indexOf(item)
    var contains = idx !== -1
    var want = this.fun(item)
    if (want && !contains){
      this._insert(this.source.indexOf(item), item)
    }else if (!want && contains){
      this._remove(idx, item)
    }
  },
  _insert: function(idx, item){
    this.indices = this.indices.map(function(i){
      if (i >= idx) return i + 1
      return i
    })
    this.indices.push(idx)
    this.indices.sort(function(one, other){
      return one - other
    })
  },
  _remove: function(idx, item){
    var ii = this.indices.indexOf(idx)
    if (ii !== -1){
      this.indices.splice(ii, 1)
    }
    E.off(item, 'change', this.$onItemChange)
  },
  toArray: function(){
    var source = this.source
    return this.indices.map(function(idx){
      return source.get(idx)
    })
  },
  destroy: function(){
    this.source.forEach(function(item){
      E.off(item, 'change', this.$onItemChange)
    }, this)
    E.off(this.source, 'insert', this.$onInsert)
    E.off(this.source, 'remove', this.$onRemove)
  }
}