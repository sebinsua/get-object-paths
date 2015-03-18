# get-object-paths

[![Build Status](https://travis-ci.org/sebinsua/get-object-paths.png)](https://travis-ci.org/sebinsua/get-object-paths) [![npm version](https://badge.fury.io/js/get-object-paths.svg)](https://npmjs.org/package/get-object-paths)

Transforms objects describing paths into arrays of paths.

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

The module has a single options argument which you can use to pass in `options.get` and `options.represent`.

`options.get` is meant to return the nodes a node points to. It accepts a function with this signature `(obj, key)`.

`options.represent` is meant to convert between the key of a node and a representation of the node (e.g. an identifier). It accepts a function with this signature `(key, obj)`.
