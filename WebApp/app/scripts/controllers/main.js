'use strict';


angular.module('webAppApp')
	.controller('MainCtrl', function($rootScope, $scope, NgMap) {



  // -- Funcs for GoogleMap
  NgMap.getMap().then(function(map) {
    console.log('map', map);
    $rootScope.map = map;
  });

  $rootScope.clicked = function() {
    alert('Clicked a link inside infoWindow');
  };

  $rootScope.destinations = [
    {id:'foo', name: 'FOO destination', position:[35.620515, 139.646976]},
    {id:'bar', name: 'BAR destination', position:[35.619416, 139.642845]}
  ];
  $rootScope.destination = $rootScope.destinations[0];

  $rootScope.showDetail = function(e, destination) {
    $rootScope.destination = destination;
    $rootScope.map.showInfoWindow('foo-iw', destination.id);
  };

  $rootScope.hideDetail = function() {
    $rootScope.map.hideInfoWindow('foo-iw');
  };
  // -- Funcs for GoogleMap


  // -- Funcs for slide-navbar
  $rootScope.dataForSlideNavbar = {
    selectedIndex: 0,
    secondLocked:  true,
    secondLabel:   "Item Two",
    bottom:        false
  };
  $rootScope.firstToSecond = function() {
    $rootScope.dataForSlideNavbar.selectedIndex = 2 ;
  };
  this.next = function() {
    $rootScope.dataForSlideNavbar.selectedIndex = Math.min($rootScope.dataForSlideNavbar.selectedIndex + 1, 2) ;
  };
  this.previous = function() {
    $rootScope.dataForSlideNavbar.selectedIndex = Math.max($rootScope.dataForSlideNavbar.selectedIndex - 1, 0);
  };
  // -- Funcs for slide-navbar

});