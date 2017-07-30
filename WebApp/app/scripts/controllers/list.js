'use strict';


angular.module('webAppApp')
  .controller('ListCtrl', function($rootScope, $scope, $http, $mdDialog) {

    $rootScope.center = {"id": 1, "name": "若林センター", "address": "東京都世田谷区代田３－２－１８"};

   
    console.log($rootScope.center);


    var imagePath = 'images/yeoman.png';
    // $rootScope.center = DelCenter;

    $scope.sds = [
        {
          "name": "山田　武", 
          "pic": imagePath,
          "level": "info",
          "id": "1", 
          "progressRate": 0.66, 
        },
        {"name": "柏原　進",
          "pic": imagePath,  
          "level": "danger",
          "id": "2",
          "progressRate": 0.2, 
        },
        {"name": "田中　謙治",
          "pic": imagePath,  
          "level": "danger",
          "id": "3",
          "progressRate": 0.3, 
        },
        {"name": "井上　聡史",
          "pic": imagePath,  
          "level": "success",
          "id": "4",
          "progressRate": 0.7, 
        },
        {"name": "佐藤　淳",
          "pic": imagePath,  
          "level": "success",
          "id": "5",
          "progressRate": 0.9, 
        },
        {"name": "配達員A",
          "pic": imagePath,
          "level": "success",
          "id": "6",
          "progressRate": 0.8, 
        },
        {"name": "配達員B",
          "pic": imagePath, 
          "level": "warning",
          "id": "7",
          "progressRate": 0.5, 
        },
        {"name": "配達員C",
          "pic": imagePath,  
          "level": "info",
          "id": "8",
          "progressRate": 0.55, 
        },
        {"name": "配達員D",
          "pic": imagePath, 
          "level": "danger", 
          "id": "9",
          "progressRate": 0.22, 
        }
    ];

  $rootScope.onClick = function (points, evt) {
    console.log(points[0]._index);
    var index = points[0]._index;
    if(index == 0){
      console.log("Show Remainig");
      $rootScope.remainingClicked(false);
      $rootScope.redeliveringClicked(false);
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
            address: destination.address,
            position: destination.x + "," + destination.y
          };
      $rootScope.finishedDestinations.push(item);
    });
  };

  $rootScope.resetRedeliveringDestinations = function(){
    $rootScope.redeliveringDestinations = [];
  };
  $rootScope.setRedeliveringDestinations = function(destinationList){
    $rootScope.redeliveringDestinations = [];
    destinationList.forEach(function(destination){
      var item = {
            id: destination.baggageId, 
            name: destination.customerName, 
            address: destination.address,
            position: destination.x + "," + destination.y
          };
      $rootScope.redeliveringDestinations.push(item);
    });
  };

  $rootScope.resetRemainingDestinations = function(){
    $rootScope.remainingDestinations = [];
  };
  $rootScope.setRemainingDestinations = function(destinationList){
    $rootScope.remainingDestinations = [];
    destinationList.forEach(function(destination){
      // var item = {
      //       id: destination.baggageId, 
      //       name: destination.customerName, 
      //       address: destination.address,
      //       position: destination.x + "," + destination.y
      //     };
      var item = {
            id: destination.baggageId, 
            name: destination.customerName, 
            address: destination.address,
            position: destination.x + "," + destination.y
          };
      $rootScope.remainingDestinations.push(item);
    });
    console.log($rootScope.remainingDestinations);
  };


  $rootScope.loadOptRoute = function(callback){
    $http({
      method: 'GET',
      url: "http://52.68.160.220/api/route?track_id=3",
      header: {
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods':'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers':'*'
      }
    }).then(function successCallback(response) {

      console.log("response:");
      console.log(response.data);
      callback(response.data);

    }, function errorCallback(response) {
      console.log(response);
      callback(null);
    });
  }



  $rootScope.showRoute = function(destinationList){

    $rootScope.loadOptRoute(function(data){
      var destinationList_wk = data.slice();
      var originDirection = $rootScope.truckPos[0]
      $rootScope.origin = originDirection.position;
      // var finalDestDirection = destinationList_wk.pop();
      // var finalDestDirection = destinationList_wk.pop();
      $rootScope.destination = $rootScope.center.address;

      console.log($rootScope.origin);
      console.log($rootScope.destination);

      $rootScope.wayPoints = [];
      destinationList_wk.forEach(function(point){
        // var tmp = {location: {lat:axis.x, lng:axis.y}, stopover: true};
        var tmp = {location: point.x + "," + point.y, stopover: true};
        $rootScope.wayPoints.push(tmp);
      });
      $rootScope.finishedDestinations = [];
      $rootScope.redeliveringDestinations = [];
      console.log($rootScope.wayPoints);

    });

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
      $rootScope.rawRedeliveringDestinations = response.data.baggages.redelivery;

      $rootScope.name = response.data.name;
      $rootScope.progressRate = (response.data.progressRate *100).toFixed(1);

      callback();

    }, function errorCallback(response) {
      console.log(response);
      callback();
    });
  // }, 1000);
};

  $rootScope.onFl = function(){
    console.log("fl on");
    $rootScope.fl = true;
  };

  $rootScope.offFl = function(){
    console.log("fl off");
    $rootScope.fl = false;
  };


  // Funcs when user chooses SD from a list.
  $rootScope.chooseSd = function(sd){

    console.log("chooseSd() is run!!!");
    $rootScope.updateTruckPos(sd,   function(){
      // $rootScope.defaultZoom = sd.defaultZoom;
      // $rootScope.centerAxis = sd.centerAxis;
      $rootScope.defaultZoom = 15;
      $rootScope.centerAxis = "〒155-0032 東京都世田谷区代沢５丁目１４";

      var remainingSize = $rootScope.rawRemainingDestinations.length;
      var finishedSize = $rootScope.rawFinishedDestinations.length;
      var redeliveringSize = $rootScope.rawRedeliveringDestinations.length;
      $rootScope.doneRate = ((finishedSize / (finishedSize + remainingSize)) * 100).toFixed(1);


      $rootScope.labels = [ "配達済み", "配達予定", "再配達"];
      $rootScope.data = [finishedSize, remainingSize, redeliveringSize];
      $rootScope.options = {legend: {display: true, position: 'right'}};
      $rootScope.colors = ['#1E90FF', '#FF0000', '#32CD32'];

      // SInitialize the page.
      $rootScope.sd = sd;
      $rootScope.firstToSecond(); 

      $rootScope.remainingClicked(true);
      $rootScope.finishedClicked(true);
      $rootScope.redeliveringClicked(true);

    });

      setTimeout(function(){
        if($rootScope.fl){
          $rootScope.chooseSd(sd);
        }else{
          console.log("Keep checking...");
        };
      }, 3000);


  };

  $rootScope.showFinished = function(){
      $rootScope.setFinishedDestinations($rootScope.rawFinishedDestinations);
  };
  $rootScope.hideFinished = function(){
      $rootScope.resetFinishedDestinations();
  };

  $rootScope.showRedelivering = function(){
      $rootScope.setRedeliveringDestinations($rootScope.rawRedeliveringDestinations);
  };
  $rootScope.hideRedelivering = function(){
      $rootScope.resetRedeliveringDestinations();
  };

  $rootScope.showRemaining = function(){
    // $rootScope.loadOptRoute(function(data){
      $rootScope.setRemainingDestinations($rootScope.rawRemainingDestinations);
      // $rootScope.setRemainingDestinations(data);
    // });
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

  $rootScope.redeliveringClicked = function(val){
    if(val){
      $rootScope.showRedelivering();
    }else{
      $rootScope.hideRedelivering();
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
      $rootScope.fl = false;
      $rootScope.showRoute($rootScope.rawRemainingDestinations);
      $rootScope.SecondToThird();
    }else{
      $rootScope.hideRoute();
    }
  }


});