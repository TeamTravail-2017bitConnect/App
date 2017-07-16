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

    $scope.sds = [
        {
          "name": "Yamada", 
          "id": "0001", 
          "progress": 50, 
          "centerAxis": {"x": 35.620515, "y": 139.646976},
          "finished": [
            {"x": 35.620515, "y": 139.646976},
            {"x": 35.820515, "y": 138.646976},
            {"x": 35.020515, "y": 139.146976},
            {"x": 35.120515, "y": 138.146976}
          ],
          "remaining": [
            {"x": 34.620515, "y": 139.646976},
            {"x": 34.820515, "y": 138.646976},
            {"x": 34.020515, "y": 139.146976},
            {"x": 34.120515, "y": 138.146976}
          ]},
        {"name": "Tanaka", 
          "id": "0002",
          "progress": 20, 
          "centerAxis": {"x": 34.620515, "y": 139.646976},
          "finished": [
            {"x": 34.620515, "y": 139.646976},
            {"x": 34.820515, "y": 138.646976}
          ],
          "remaining": [
            {"x": 34.020515, "y": 139.146976},
            {"x": 34.120515, "y": 138.146976},
            {"x": 34.620515, "y": 139.646976},
            {"x": 34.820515, "y": 138.646976},
            {"x": 34.020515, "y": 139.146976},
            {"x": 34.120515, "y": 138.146976}
          ]}
    ];


  $scope.doSecondaryAction = function(event) {
    $mdDialog.show(
      $mdDialog.alert()
        .title('Secondary Action')
        .textContent('Secondary actions can be used for one click actions')
        .ariaLabel('Secondary click demo')
        .ok('Neat!')
        .targetEvent(event)
    );
  };

  $scope.chooseSd = function(sd){
    $rootScope.destinations = [];
    sd.finished.forEach(function(axis){
      var item = {
            id:'foo', 
            name: 'FOO destination', 
            position:[axis.x, axis.y]
          };
      $rootScope.destinations.push(item);
    });

    $rootScope.firstToSecond();
  }

});