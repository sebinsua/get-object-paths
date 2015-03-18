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
