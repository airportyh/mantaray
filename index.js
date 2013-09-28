module.exports = MantaRay

function MantaRay(){
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
    this.arr.push(obj)
  },
  insert: function(i, obj){
    this.arr.splice(i, 0, obj)
  },
  remove: function(obj){
    var idx = this.arr.indexOf(obj)
    this.arr.splice(idx, 1)
  },
  contains: function(obj){
    return this.arr.indexOf(obj) !== -1
  },
  clear: function(){
    this.arr = []
  },
  toArray: function(){
    return this.arr
  }
}

