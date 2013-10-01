var FilteredArray = require('./filtered')
var test = require('tape')
var Array = require('./index')
var set = require('setter')

test('basic', function(t){
  var arr = new Array(1, 2, 3)
  var filtered = new FilteredArray(arr, function(n){
    return n % 2 === 1
  })
  t.equal(filtered.size(), 2)
  t.equal(filtered.get(0), 1)
  t.equal(filtered.get(1), 3)
  t.end()
})

test('indexOf', function(t){
  var arr = new Array(1, 2, 3)
  var filtered = new FilteredArray(arr, function(n){
    return n % 2 === 1
  })
  t.equal(filtered.indexOf(2), -1)
  t.equal(filtered.indexOf(1), 0)
  t.equal(filtered.indexOf(3), 1)
  t.end()
})

test('contains', function(t){
  var arr = new Array(1, 2, 3)
  var filtered = new FilteredArray(arr, function(n){
    return n % 2 === 1
  })
  t.assert(filtered.contains(1))
  t.assert(!filtered.contains(2))
  t.assert(filtered.contains(3))
  t.end()
})

test('source changes, so does this', function(t){
  var source = new Array(1, 2, 3)
  var filtered = new FilteredArray(source, function(n){
    return n % 2 === 1
  })
  
  source.add(5)
  t.equal(filtered.size(), 3)
  t.deepEqual(filtered.toArray(), [1, 3, 5])
  t.end()
})

test('updates when insert into source', function(t){
  var source = new Array(1, 2, 3)
  var filtered = new FilteredArray(source, function(n){
    return n % 2 === 1
  })

  source.insert(2, 7)
  t.deepEqual(source.toArray(), [1, 2, 7, 3])
  t.deepEqual(filtered.toArray(), [1, 7, 3])
  t.end()
})

test('updates when removed from source', function(t){
  var source = new Array(1, 2, 3)
  var filtered = new FilteredArray(source, function(n){
    return n % 2 === 1
  })
  source.remove(2)
  t.equal(filtered.size(), 2)
  source.remove(1)
  t.equal(filtered.size(), 1)
  t.end()
})

test('dont allow add, insert, remove or clear', function(t){
  var source = new Array(1, 2, 3)
  var filtered = new FilteredArray(source, function(n){
    return n % 2 === 1
  })
  t.throws(function(){
    filtered.add(4)
  })
  t.throws(function(){
    filtered.remove(4)
  })
  t.throws(function(){
    filtered.insert(4, 1)
  })
  t.throws(function(){
    filtered.clear()
  })
  t.end()
})

test('items change, also changes', function(t){
  var bob = { name: 'bob', age: 1 }
  var mary = { name: 'mary', age: 2 }
  var source = new Array(bob, mary)
  var filtered = new FilteredArray(source, function(child){
    return child.age % 2 === 1
  })
  t.equal(filtered.size(), 1)
  set(mary, 'age', 3)
  t.equal(filtered.size(), 2)
  set(bob, 'age', 2)
  t.equal(filtered.size(), 1)
  t.end()
})

test('listens to added items', function(t){
  var bob = { name: 'bob', age: 1 }
  var mary = { name: 'mary', age: 2 }
  var source = new Array(bob)
  var filtered = new FilteredArray(source, function(child){
    return child.age % 2 === 1
  })
  source.add(mary)
  t.equal(filtered.size(), 1)
  set(mary, 'age', 3)
  t.equal(filtered.size(), 2)
  t.end()
})

test('clean up', function(t){
  var bob = { name: 'bob', age: 1 }
  var mary = { name: 'mary', age: 2 }
  var source = new Array(bob, mary)
  var filtered = new FilteredArray(source, function(child){
    return child.age % 2 === 1
  })
  filtered.destroy()
  t.equal(numListeners(source), 0)
  t.equal(numListeners(bob), 0)
  t.equal(numListeners(mary), 0)
  t.end()
})

test('clean up on remove', function(t){
  var bob = { name: 'bob', age: 1 }
  var mary = { name: 'mary', age: 2 }
  var source = new Array(bob, mary)
  var filtered = new FilteredArray(source, function(child){
    return child.age % 2 === 1
  })
  source.remove(bob)
  t.equal(numListeners(bob), 0)
  t.end()
})

function numListeners(obj){
  var handlers = obj.__emmittdata__.handlers
  var count = 0
  for (var key in handlers){
    count += handlers[key] ? handlers[key].length : 0
  }
  return count
}


