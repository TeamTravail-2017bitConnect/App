'use strict';


angular.module('webAppApp')
  .controller('ListCtrl', function($rootScope, $scope, $http, $mdDialog) {

    // -- Load a json file
   // $http({
   //    method: 'GET',
   //    url: 'sd_list.json'
   // }).then(function (success){
   //    $scope.items = data.list;
   //    console.log($scope.items);
   // },function (error){
   //    console.log("Failed to load a file.");
   //    console.log(error);
   // });
    // -- Load a json file

    var imagePath = 'images/yeoman.png';

    $scope.sds = [
        {
          "name": "Yamada", 
          "pic": imagePath, 
          "id": "0001", 
          "progress": 50, 
          "centerAxis": {"x": 35.620515, "y": 139.646976},
          "defaultZoom": 18,
          "finished": [
            {"id": 1, "name":"Ken1", "x": 35.620515, "y": 139.646976},
            {"id": 2, "name":"Ken2", "x": 35.621515, "y": 139.648976},
            {"id": 3, "name":"Ken3", "x": 35.620115, "y": 139.646176},
            {"id": 4, "name":"Ken4", "x": 35.620215, "y": 139.646876}
          ],
          "remaining": [
            {"id": 5, "name":"Ken5", "x": 35.620505, "y": 139.647666},
            {"id": 6, "name":"Ken6", "x": 35.621505, "y": 139.648576},
            {"id": 7, "name":"Ken7", "x": 35.620105, "y": 139.646576},
            {"id": 8, "name":"Ken8", "x": 35.620205, "y": 139.646576}
          ]},
        {"name": "Tanaka",
          "pic": imagePath,  
          "id": "0002",
          "progress": 20, 
          "centerAxis": {"x": 36.020515, "y": 138.946976},
          "defaultZoom": 7,
          "finished": [
            {"id": 1, "name":"Taka1", "x": 36.020515, "y": 138.946976},
            {"id": 2, "name":"Taka2", "x": 35.921515, "y": 139.948976}
          ],
          "remaining": [
            {"id": 3, "name":"Taka3", "x": 34.020515, "y": 139.146976},
            {"id": 4, "name":"Taka4", "x": 34.120515, "y": 138.146976},
            {"id": 5, "name":"Taka5", "x": 34.620515, "y": 139.646976},
            {"id": 6, "name":"Taka6", "x": 34.820515, "y": 138.646976},
            {"id": 7, "name":"Taka7", "x": 34.020515, "y": 139.146976},
            {"id": 8, "name":"Taka8", "x": 34.120515, "y": 138.146976}
          ]}
    ];

  $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
  $scope.data = [300, 500, 100];


  // $scope.doSecondaryAction = function(event) {
  //   $mdDialog.show(
  //     $mdDialog.alert()
  //       .title('Secondary Action')
  //       .textContent('Secondary actions can be used for one click actions')
  //       .ariaLabel('Secondary click demo')
  //       .ok('Neat!')
  //       .targetEvent(event)
  //   );
  // };

  $scope.resetFinishedDestinations = function(){
    $rootScope.finishedDestinations = [];
  };
  $scope.setFinishedDestinations = function(sd){
    $rootScope.finishedDestinations = [];
    sd.finished.forEach(function(axis){
      var item = {
            id: axis.id, 
            name: axis.name, 
            position:[axis.x, axis.y]
          };
      $rootScope.finishedDestinations.push(item);
    });
  };

  $scope.resetRemainingDestinations = function(){
    $rootScope.remainingDestinations = [];
  };
  $scope.setRemainingDestinations = function(sd){
    $rootScope.remainingDestinations = [];
    sd.remaining.forEach(function(axis){
      var item = {
            id: axis.id, 
            name: axis.name, 
            position:[axis.x, axis.y]
          };
      $rootScope.remainingDestinations.push(item);
    });
  };

  $scope.showRoute = function(destinationList){
      var destinationList_wk = destinationList.slice();
      var originDirection = destinationList_wk.shift();
      var originAxis = [originDirection.x, originDirection.y];
      var finalDestDirection = destinationList_wk.pop();
      var finalDestAxis = [finalDestDirection.x, finalDestDirection.y];

      $rootScope.origin = originAxis.join(',');
      $rootScope.destination = finalDestAxis.join(',');

      $rootScope.wayPoints = [];
      destinationList_wk.forEach(function(axis){
        var tmp = {location: {lat:axis.x, lng:axis.y}, stopover: true};
        $rootScope.wayPoints.push(tmp);
      });
  };
  $scope.hideRoute = function(){
    $rootScope.origin = null;
    $rootScope.destination = null;
    $rootScope.wayPoints = [];
    console.log($rootScope.origin);
    console.log($rootScope.destination);
  };

  // Funcs when user chooses SD from a list.
  $scope.chooseSd = function(sd){
    // Set destinations for marker.
    // $scope.setFinishedDestinations(sd);
    // $scope.setRemainingDestinations(sd);
    // Set params for gmap.
    $rootScope.defaultZoom = sd.defaultZoom;
    $rootScope.centerAxis = sd.centerAxis;
    // SInitialize the page.
    $rootScope.sd = sd;
    $rootScope.firstToSecond(); 
  };

  $rootScope.showFinished = function(){
      $scope.setFinishedDestinations($rootScope.sd);
  };
  $rootScope.hideFinished = function(){
      $scope.resetFinishedDestinations();
  };

  $rootScope.showRemaining = function(){
    $scope.setRemainingDestinations($rootScope.sd);
    $scope.showRoute($rootScope.sd.remaining);
  };
  $rootScope.hideRemaining = function(){
      $scope.hideRoute();
      $scope.resetRemainingDestinations();
  };


  $rootScope.finishedClicked = function(val){
    console.log(val);
    if(val){
      $rootScope.showFinished();
    }else{
      $rootScope.hideFinished();
    }
  }

  $rootScope.remainingClicked = function(val){
    console.log(val);
    if(val){
      $rootScope.showRemaining();
    }else{
      $rootScope.hideRemaining();
    }
  }

});