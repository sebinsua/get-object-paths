'use strict';

var createPathFinder = require('..');

describe('get-object-paths', function () {

  describe('for a simple object', function () {

    var obj, startPath;
    beforeEach(function () {
      obj = {
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
      startPath = 'a';
    });

    it('should be able to find paths', function () {
      var findPaths = createPathFinder();
      var simplePaths = findPaths(obj, startPath);
      simplePaths.should.deep.equal([
        ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'i', 'end'],
        ['a', 'b', 'c', 'd', 'e', 'g', 'i', 'end'],
        ['a', 'b', 'c', 'd', 'e', 'h', 'j', 'k', 'l', 'end']
      ]);
    });

  });

  describe('for a complex object', function () {

    var obj, startPath;
    beforeEach(function () {
      obj = {
        'a': {
          stepIdentifier: 'step-a',
          next: 'b'
        },
        'b': {
          stepIdentifier: 'step-b',
          next: 'c'
        },
        'c': {
          stepIdentifier: 'step-c',
          next: 'd'
        },
        'd': {
          stepIdentifier: 'step-d',
          next: 'e'
        },
        'e': {
          stepIdentifier: 'step-e',
          nexts: {
            'some-change-a': 'f',
            'some-change-b': 'g',
            'some-change-c': 'h'
          }
        },
        'f': {
          stepIdentifier: 'step-f',
          next: 'g'
        },
        'g': {
          stepIdentifier: 'step-g',
          next: 'i'
        },
        'h': {
          stepIdentifier: 'step-h',
          next: 'j'
        },
        'i': {
          stepIdentifier: 'step-i',
          next: 'end'
        },
        'j': {
          stepIdentifier: 'step-j',
          next: 'k'
        },
        'k': {
          stepIdentifier: 'step-k',
          next: 'l'
        },
        'l': {
          stepIdentifier: 'step-l',
          next: 'end'
        },
        'end': {
          stepIdentifier: 'step-end'
        }
      };
      startPath = 'a';
    });

    it('should be able to find paths', function () {
      var objectValues = function (o) {
        var values = [];
        for (var key in o) {
          if (o.hasOwnProperty(key)) {
            values.push(o[key]);
          }
        }
        return values;
      };

      var findNexts = createPathFinder({
        get: function getPath(o, key) {
          var step = o[key];
          var next;
          if (step && step.next) {
            next = step.next;
          } else if (step && step.nexts) {
            next = objectValues(step.nexts);
          }
          return next;
        },
        represent: function pathToStepIdentifier(key, o) {
          var step = o[key];
          return step.stepIdentifier;
        }
      });

      var nextPaths = findNexts(obj, startPath);
      nextPaths.should.deep.equal([
        ['step-a', 'step-b', 'step-c', 'step-d', 'step-e', 'step-f', 'step-g', 'step-i', 'step-end'],
        ['step-a', 'step-b', 'step-c', 'step-d', 'step-e', 'step-g', 'step-i', 'step-end'],
        ['step-a', 'step-b', 'step-c', 'step-d', 'step-e', 'step-h', 'step-j', 'step-k', 'step-l', 'step-end']
      ]);
    });

  });

});
