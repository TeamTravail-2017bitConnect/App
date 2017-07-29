'use strict';

/**
 * @ngdoc service
 * @name webAppApp.d3Service
 * @description
 * # d3Service
 * Factory in the webAppApp.
 */
angular.module('webAppApp')
  .factory('d3Service', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
