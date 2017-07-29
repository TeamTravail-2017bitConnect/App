'use strict';


angular.module('webAppApp')
  .controller('ListCtrl', function($rootScope, $scope, $http, $mdDialog) {

    var imagePath = 'images/yeoman.png';
    $rootScope.center = {
      "name": "東京メインセンター１",
      "x": "35.615514",
      "y": "139.632126 "
    };

    $scope.sds = [
        {
          "name": "Yamada", 
          "pic": imagePath, 
          "id": "1", 
          "progress": 50, 
        },
        {"name": "Tanaka",
          "pic": imagePath,  
          "id": "2",
          "progress": 20, 
        }
    ];

  $rootScope.onClick = function (points, evt) {
    console.log(points[0]._index);
    var index = points[0]._index;
    if(index == 0){
      console.log("Show Remainig");
      $rootScope.remainingClicked(false);
      console.log($rootScope.remainingDestinations);
    };
  };


  $rootScope.resetFinishedDestinations = function(){
    $rootScope.finishedDestinations = [];
  };
  $rootScope.setFinishedDestinations = function(destinationList){
    $rootScope.finishedDestinations = [];
    destinationList.forEach(function(destination){
      var item = {
            id: destination.baggageId, 
            name: destination.customerName, 
            position: destination.x + "," + destination.y
          };
      $rootScope.finishedDestinations.push(item);
    });
  };

  $rootScope.resetRemainingDestinations = function(){
    $rootScope.remainingDestinations = [];
  };
  $rootScope.setRemainingDestinations = function(destinationList){
    $rootScope.remainingDestinations = [];
    destinationList.forEach(function(destination){
      var item = {
            id: destination.baggageId, 
            name: destination.customerName, 
            position: destination.x + "," + destination.y
          };
      $rootScope.remainingDestinations.push(item);
    });
    console.log($rootScope.remainingDestinations);
  };

  $rootScope.showRoute = function(destinationList){
      var destinationList_wk = destinationList.slice();
      var originDirection = $rootScope.truckPos[0]
      $rootScope.origin = originDirection.position;
      // var finalDestDirection = destinationList_wk.pop();
      // var finalDestDirection = destinationList_wk.pop();
      $rootScope.destination = $rootScope.center.x + "," + $rootScope.center.y;

      console.log($rootScope.origin);
      console.log($rootScope.destination);

      $rootScope.wayPoints = [];
      destinationList_wk.forEach(function(point){
        // var tmp = {location: {lat:axis.x, lng:axis.y}, stopover: true};
        var tmp = {location: point.x + "," + point.y, stopover: true};
        $rootScope.wayPoints.push(tmp);
      });
      console.log($rootScope.wayPoints);
  };
  $rootScope.hideRoute = function(){
    $rootScope.origin = undefined;
    $rootScope.destination = undefined;
    $rootScope.wayPoints = [];
  };



$rootScope.updateTruckPos = function(sd, callback){
  // setTimeout(function(){
    $http({
      method: 'GET',
      url: "http://52.192.108.213/trucks/" + sd.id,
      header: {
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods':'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers':'*'
      }
    }).then(function successCallback(response) {

      console.log("response:");
      console.log(response);

      var locationList = response.data.locationHistory;
      $rootScope.truckPos = [{
          "id": locationList[0].update_at,
          "position": [locationList[0].x, locationList[0].y]
        }];

      $rootScope.rawRemainingDestinations = response.data.baggages.delivering;
      $rootScope.rawFinishedDestinations = response.data.baggages.done;

      $rootScope.name = response.data.name;
      $rootScope.progressRate = response.data.progressRate *100;

      callback();

    }, function errorCallback(response) {
      console.log(response);
      callback();
    });
  // }, 1000);
};



  // Funcs when user chooses SD from a list.
  $rootScope.chooseSd = function(sd){

    $rootScope.updateTruckPos(sd,   function(){
      $rootScope.defaultZoom = sd.defaultZoom;
      $rootScope.centerAxis = sd.centerAxis;

      var remainingSize = $rootScope.rawRemainingDestinations.length;
      var finishedSize = $rootScope.rawFinishedDestinations.length;
      var redeliveringSize = 5;
      $rootScope.doneRate = (finishedSize / (finishedSize + remainingSize)) * 100;


      $rootScope.labels = ["配達済み", "未配達", "再配達"];
      $rootScope.data = [remainingSize, finishedSize, redeliveringSize];
      $rootScope.options = {legend: {display: true, position: 'right'}};

      // SInitialize the page.
      $rootScope.sd = sd;
      $rootScope.firstToSecond(); 

      $rootScope.remainingClicked(true);
      $rootScope.finishedClicked(true);

    });
  };

  $rootScope.showFinished = function(){
      $rootScope.setFinishedDestinations($rootScope.rawFinishedDestinations);
  };
  $rootScope.hideFinished = function(){
      $rootScope.resetFinishedDestinations();
  };

  $rootScope.showRemaining = function(){
    $rootScope.setRemainingDestinations($rootScope.rawRemainingDestinations);
  };
  $rootScope.hideRemaining = function(){
      $scope.resetRemainingDestinations();
  };


  $rootScope.finishedClicked = function(val){
    if(val){
      $rootScope.showFinished();
    }else{
      $rootScope.hideFinished();
    }
  }

  $rootScope.remainingClicked = function(val){
    if(val){
      $rootScope.showRemaining();
    }else{
      $rootScope.hideRemaining();
    }
  }

  $rootScope.routeClicked = function(val){
    if(val){
      $rootScope.showRoute($rootScope.rawRemainingDestinations);
    }else{
      $rootScope.hideRoute();
    }
  }


});