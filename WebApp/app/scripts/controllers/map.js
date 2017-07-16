'use strict';

angular.module('webAppApp')
	.controller('MapCtrl', function($scope, NgMap) {

	NgMap.getMap().then(function(map) {
		console.log('map', map);
		$scope.map = map;
	});

	$scope.clicked = function() {
		alert('Clicked a link inside infoWindow');
	};

	$scope.destinations = [
		{id:'foo', name: 'FOO destination', position:[35.620515, 139.646976]},
		{id:'bar', name: 'BAR destination', position:[35.619416, 139.642845]}
	];
	$scope.destination = $scope.destinations[0];

	$scope.showDetail = function(e, destination) {
		$scope.destination = destination;
		$scope.map.showInfoWindow('foo-iw', destination.id);
	};

	$scope.hideDetail = function() {
		$scope.map.hideInfoWindow('foo-iw');
	};

});