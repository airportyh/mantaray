var test = require('tape')
var Array = require('./index')

test('create', function(t){
  t.equal(new Array().size(), 0)
  t.equal(new Array(1).size(), 1)
  t.end()
})

test('access', function(t){
  var ray = new Array(1)
  t.equal(ray.get(0), 1)
  t.end()
})

test('add', function(t){
  var ray = new Array()
  ray.add('hello')
  t.equal(ray.size(), 1)
  ray.add('world')
  t.equal(ray.size(), 2)
  t.equal(ray.get(0), 'hello')
  t.equal(ray.get(1), 'world')
  t.end()
})

test('insert', function(t){
  var ray = new Array(1, 3)
  ray.insert(1, 2)
  t.equal(ray.size(), 3)
  t.equal(ray.get(0), 1)
  t.equal(ray.get(1), 2)
  t.equal(ray.get(2), 3)
  t.end()
})

test('remove', function(t){
  var ray = new Array(1, 2)
  ray.remove(1)
  t.equal(ray.get(0), 2)
  t.equal(ray.size(), 1)
  t.end()
})

test('contains', function(t){
  var ray = new Array(1, 2)
  t.assert(ray.contains(1))
  t.assert(!ray.contains(3))
  t.end()
})

test('clear', function(t){
  var ray = new Array(1, 2, 3)
  ray.clear()
  t.equal(ray.size(), 0)
  t.end()
})

test('toArray', function(t){
  var ray = new Array(1, 2, 3)
  t.deepEqual(ray.toArray(), [1, 2, 3])
  t.end()
})

