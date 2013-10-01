
module.exports = {
  forEach: function(arr, iter, context){
    for (var i = 0; i < arr.length; i++){
      iter.call(context, arr[i], i, arr);
    }
  }
  ,
  reduce: function(arr, accumlator, initVal){
    var curr = initVal;
    arr.forEach(function(item, i, arr){
      curr = accumlator(curr, item, i, arr);
    });
    return curr;
  }
  ,
  reduceRight: function(arr, accumlator, initVal){
    var curr = initVal;
    for (var i = arr.length - 1; i >= 0; i--){
      var item = arr[i];
      curr = accumlator(curr, item, i, arr);
    }
    return curr;
  }
  ,
  map: function(arr, func, context){
    var len = arr.length,
      ret = []
    for (var i = 0; i < len; i++){
      if (i in arr)
        ret[i] = func.call(context, arr[i], i, arr)
    }
    return ret
  }
  ,
  filter: function(arr, accept, context){
    return arr.reduce(function(curr, item, i, arr){
      return accept.call(context, item, i, arr) ? curr.concat(item) : curr;
    }, []);
  }
  ,
  every: function(arr, predicate, context){
    return arr.reduce(function(curr, item, i, arr){
      return curr && predicate.call(context, item, i, arr);
    }, true);
  }
  ,
  some: function(arr, predicate, context){
    return arr.reduce(function(curr, item, i, arr){
      return curr || predicate.call(context, item, i, arr);
    }, false);
  }
  ,
  indexOf: function(arr, target, startFrom){
    var len = arr.length
    for (var i = startFrom || 0; i < len; i++){
      if (i in arr && arr[i] === target) return i;
    }
    return -1;
  }
  ,
  lastIndexOf: function(arr, target, startFrom){
    var len = arr.length
    for (var i = startFrom || len - 1; i >= 0; i--)
      if (i in arr && arr[i] === target) return i;
    return -1;
  }
}
