'use strict';

var identity = function (value) {
  return value;
};

var getValue = function (obj, key) {
  return obj[key];
};

var flatten = function (arrs) {
  var empty = [];
  return empty.concat.apply(empty, arrs);
};

var callWithKey = function (fn, obj) {
  return function (key) {
    return fn(obj, key);
  };
};

var appendValueToChain = function (arr) {
  return function (value) {
    return arr.concat(value);
  };
};

var createPathFinder = function (options) {
  options = options || {};
  var get = options.get || getValue;
  var represent = options.represent || identity;

  return function getPaths(obj, key) {
    var arr = [represent(key, obj)];

    var value = get(obj, key), values = [];
    if (value) {
      values = [].concat(value);
      return flatten(
        values.map(callWithKey(getPaths, obj))
      ).map(
        appendValueToChain(arr)
      );
    } else {
      return arr;
    }

  };
};

module.exports = createPathFinder;
