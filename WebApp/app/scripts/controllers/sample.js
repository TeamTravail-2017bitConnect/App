'use strict';

angular.module('webAppApp')
      .controller('AppCtrl', function () {
          this.data = {
            selectedIndex: 0,
            secondLocked:  true,
            secondLabel:   "Item Two",
            bottom:        false
          };
          this.next = function() {
            this.data.selectedIndex = Math.min(this.data.selectedIndex + 1, 2) ;
          };
          this.previous = function() {
            this.data.selectedIndex = Math.max(this.data.selectedIndex - 1, 0);
          };
       });