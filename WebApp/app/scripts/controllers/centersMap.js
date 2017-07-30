'use strict';

angular.module('webAppApp')
	.controller('CentersMapCtrl', function($rootScope, $scope, NgMap) {

	NgMap.getMap().then(function(map) {
		$scope.map = map;
	});

	$scope.centerList = [
		{"id": 1, "color": "#ffffff", "name": "若林センター", "address": "東京都世田谷区代田３－２－１８"},
		{"id": 2, "color": "yellow", "name": "西新宿つのはずセンター", "address": "東京都新宿区西新宿３－９－５北村ハイツ１Ｆ"},
		{"id": 3, "color": "yellow", "name": "新中野センター", "address": "東京都中野区本町４－３２－４"},
		{"id": 4, "color": "yellow", "name": "中野坂上センター", "address": "東京都中野区本町１－１４－１１ドネグレイス立川ビル"},
		{"id": 5, "color": "yellow", "name": "世田谷大原センター", "address": "東京都世田谷区大原２－２４－２１"},
		{"id": 6, "color": "red", "name": "代々木北センター", "address": "東京都世田谷区北沢１－３９－７"},
		{"id": 7, "color": "yellow", "name": "下北沢センター", "address": "東京都渋谷区代々木２－６－３新宿三協ビル１Ｆ"},
		{"id": 8, "color": "yellow", "name": "上馬センター", "address": "東京都世田谷区上馬２－２２－１０"},
		{"id": 9, "color": "yellow", "name": "サザエさん通りセンター", "address": "東京都世田谷区桜新町２－１５－１８"},
		{"id": 10, "color": "yellow", "name": "赤堤センター", "address": "東京都世田谷区八幡山１－３－６"},
		{"id": 11, "color": "yellow", "name": "豪徳寺センター", "address": "東京都世田谷区豪徳寺１－４０－７"},
		{"id": 12, "color": "yellow", "name": "上用賀センター", "address": "東京都世田谷区上用賀１－２２－２６"},
		{"id": 13, "color": "yellow", "name": "深沢５丁目センター", "address": "上用賀センター"},
		{"id": 14, "color": "yellow", "name": "深沢センター", "address": "東京都世田谷区等々力６－５－１１"},
		{"id": 15, "color": "yellow", "name": "奥沢５丁目センター", "address": "東京都世田谷区等々力４－１６－１３"},
		{"id": 16, "color": "yellow", "name": "大岡山センター", "address": "東京都目黒区大岡山１－１３－１３"}
	];

	$scope.center = $scope.centerList[0];

	$scope.showCenterDetail = function(e, center){
    	$scope.center = center;
    	$scope.map.showInfoWindow('foo-iw', center.id);
	};

	$scope.hideDetail = function() {
		$scope.map.hideInfoWindow('foo-iw');
	};

	$scope.choseCenter = function(center){
		$scope.hideDetail();
		$rootScope.center = center;
	};

});