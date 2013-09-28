var test = require('tape')
var Array = require('./index')
var spy = require('ispy')
var E = require('emmitt')

test('create', function(t){
  t.equal(new Array().size(), 0)
  t.equal(new Array(1).size(), 1)
  t.end()
})

test('call constructor w/o new dont matter', function(t){
  t.equal(Array().size(), 0)
  t.equal(Array(1).size(), 1)
  t.assert(Array() instanceof Array, 'is instanceof MantaRay')
  t.end()
})
/*
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

test('indexOf', function(t){
  var ray = new Array(1, 2, 3)
  t.equal(ray.indexOf(2), 1)
  t.end()
})

test('toArray', function(t){
  var ray = new Array(1, 2, 3)
  t.deepEqual(ray.toArray(), [1, 2, 3])
  t.end()
})

test('fires on add', function(t){
  var ray = new Array(1)
  var onInsert = spy()
  E.on(ray, 'insert', onInsert)
  ray.add(2)
  t.assert(onInsert.called, 'should have called')
  t.deepEqual(onInsert.lastCall.args, [1, 2])
  t.end()
})

test('fires on insert', function(t){
  var ray = new Array(1, 2)
  var onInsert = spy()
  E.on(ray, 'insert', onInsert)
  ray.insert(1, 3)
  t.assert(onInsert.called, 'should have called')
  t.deepEqual(onInsert.lastCall.args, [1, 3])
  t.end()
})

test('fires on remove', function(t){
  var ray = new Array(1, 2)
  var onRemove = spy()
  E.on(ray, 'remove', onRemove)
  ray.remove(1)
  t.assert(onRemove.called, 'should have called')
  t.deepEqual(onRemove.lastCall.args, [0, 1])
  t.end()
})

test('fires remove on clear', function(t){
  var ray = new Array(1, 2)
  var onRemove = spy()
  E.on(ray, 'remove', onRemove)
  ray.clear()
  t.assert(onRemove.called, 'should have called')
  t.deepEqual(onRemove.lastCall.args, [[0, 1], [1, 2]])
  t.end()
})
*/