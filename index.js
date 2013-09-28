var E = require('emmitt')

module.exports = MantaRay

function MantaRay(){
  if (!(this instanceof MantaRay)){
    var f = function(){}
    f.prototype = MantaRay.prototype
    var ret = new f
    MantaRay.apply(ret, arguments)
    return ret
  }
  this.arr = Array.prototype.slice.apply(arguments)
}

MantaRay.prototype = {
  size: function(){
    return this.arr.length
  },
  get: function(i){
    return this.arr[i]
  },
  add: function(obj){
    var idx = this.arr.length
    this.arr.push(obj)
    E.emit(this, 'insert', idx, obj)
  },
  insert: function(i, obj){
    this.arr.splice(i, 0, obj)
    E.emit(this, 'insert', i, obj)
  },
  remove: function(obj){
    var idx = this.arr.indexOf(obj)
    this.arr.splice(idx, 1)
    E.emit(this, 'remove', idx, obj)
  },
  contains: function(obj){
    return this.indexOf(obj) !== -1
  },
  indexOf: function(obj){
    if (this.arr.indexOf){
      return this.arr.indexOf(obj)
    }else{
      for (var i = 0; i < this.arr.length; i++){
        if (this.arr[i] === obj) return i
      }
      return -1
    }
  },
  clear: function(){
    var indices = []
    var arr = this.arr
    for (var i = 0; i < this.arr.length; i++){
      indices.push(i)
    }
    this.arr = []
    E.emit(this, 'remove', indices, arr)
  },
  toArray: function(){
    return this.arr
  }
}

