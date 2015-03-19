'use strict';

var identity = function (value) {
  return value;
};

var getValue = function (col, key) {
  return col[key];
};

var getKey = function (col, key) {
  return key;
};

var flatten = function (arrs) {
  var empty = [];
  return empty.concat.apply(empty, arrs);
};

var callWithKey = function (fn, col) {
  return function (key) {
    return fn(col, key);
  };
};

var appendDefinedValueToChain = function (arr) {
  return function (value) {
    if (value !== undefined) {
      return arr.concat(value);
    }
    return arr;
  };
};

var createPathFinder = function (options) {
  options = options || {};

  var get = options.get || getValue;
  var to = options.to || identity;
  var id = options.id || identity;
  var getValueOrKey = getKey;
  if (options.id) {
    getValueOrKey = get;
  }

  return function getPaths(col, key) {
    col = col || {};
    key = key !== null ? key : '';

    var el = id(getValueOrKey(col, key));
    var arr = el !== undefined ? [el] : [];

    var value = to(get(col, key)), values = [];
    if (value) {
      values = [].concat(value);
      return flatten(
        values.map(callWithKey(getPaths, col))
      ).map(
        appendDefinedValueToChain(arr)
      );
    } else {
      return arr;
    }

  };
};

module.exports = createPathFinder;
