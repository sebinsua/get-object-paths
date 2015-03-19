# get-object-paths

[![Build Status](https://travis-ci.org/sebinsua/get-object-paths.png)](https://travis-ci.org/sebinsua/get-object-paths) [![npm version](https://badge.fury.io/js/get-object-paths.svg)](https://npmjs.org/package/get-object-paths)

Transforms collections describing paths into arrays of paths.

**NOTE:** Currently this module does not have any checks or protections against (1) cycles in a graph, and (2) stack overflows. Please use it only if you have control of the data enough to know that none of these issues will be a problem.

## Installation

```javascript
npm install [--save] get-object-paths;
```

## Usage

```javascript
var getObjectPaths = require('get-object-paths')();

var obj = {
  'a': 'b',
  'b': 'c',
  'c': 'd',
  'd': 'e',
  'e': ['f', 'g', 'h'],
  'f': 'g',
  'g': 'i',
  'h': 'j',
  'i': 'end',
  'j': 'k',
  'k': 'l',
  'l': 'end',
  'end': null
};
var startPath = 'a';

var simplePaths = getObjectPaths(obj, startPath);
// Gives:
// [
//   ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'i', 'end'],
//   ['a', 'b', 'c', 'd', 'e', 'g', 'i', 'end'],
//   ['a', 'b', 'c', 'd', 'e', 'h', 'j', 'k', 'l', 'end']
// ]
```

The module has a single options argument which you can use to pass in `options.get`, `options.to` and `options.represent`.

`options.get` is meant to return the nodes a key points to. It accepts a function with this signature `(col, key)`.

`options.to` is mean to return the nodes a key points to. It accepts the node and can return any of its properties.

`options.id` is meant to convert between the key of a node and a representation of the node (e.g. an identifier). It accepts a function with this signature `(el)`.
