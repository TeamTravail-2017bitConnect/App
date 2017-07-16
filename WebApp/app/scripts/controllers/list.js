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
            {"x": 35.620515, "y": 139.646976},
            {"x": 35.621515, "y": 139.648976},
            {"x": 35.620115, "y": 139.646176},
            {"x": 35.620215, "y": 139.646876}
          ],
          "remaining": [
            {"x": 34.620515, "y": 139.646976},
            {"x": 34.820515, "y": 138.646976},
            {"x": 34.020515, "y": 139.146976},
            {"x": 34.120515, "y": 138.146976}
          ]},
        {"name": "Tanaka",
          "pic": imagePath,  
          "id": "0002",
          "progress": 20, 
          "centerAxis": {"x": 36.020515, "y": 138.946976},
          "defaultZoom": 7,
          "finished": [
            {"x": 36.020515, "y": 138.946976},
            {"x": 35.921515, "y": 139.948976}
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

  $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
  $scope.data = [300, 500, 100];


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
    $rootScope.defaultZoom = sd.defaultZoom;
    $rootScope.centerAxis = sd.centerAxis;

    $rootScope.sd = sd;
    $rootScope.firstToSecond();
  }

});