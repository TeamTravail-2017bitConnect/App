'use strict';


angular.module('webAppApp')
	.controller('MainCtrl', function($rootScope, $scope, NgMap, $route) {



  $rootScope.resetMarkers = function(){
    $rootScope.finishedDestinations = [];
    $rootScope.remainingDestinations = [];
    $rootScope.truckPos = [];

    $rootScope.origin = undefined;
    $rootScope.destination = undefined;
    $rootScope.wayPoints = [];
    $route.reload();
  };

  // -- Funcs for GoogleMap
  NgMap.getMap().then(function(map) {
    console.log('map', map);
    $rootScope.map = map;
  });

  $rootScope.clicked = function() {
    alert('Clicked a link inside infoWindow');
  };

  $rootScope.destinations = [];
  $rootScope.destination = $rootScope.destinations[0];
  $rootScope.defaultZoom = 15;
  $rootScope.centerAxis = {"x": 35.620515, "y": 139.646976};

  $rootScope.showDetail = function(e, destination) {
    $rootScope.map.hideInfoWindow('foo-iw');
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
    $rootScope.dataForSlideNavbar.selectedIndex = 1 ;
  };
  $rootScope.SecondToThird = function() {
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