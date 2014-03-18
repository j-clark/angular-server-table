var app = angular.module('angularServerTable', function() {

});

app.directive('serverTable', function() {
  return {
    scope: true,
    templateUrl: 'templates/table.html',
    replace: true,
    link: function(elem, attr) {
      console.log("howdy");
    }
  };
});

app.controller('TableController', function($scope, $http) {
  $scope.headers = ['Name', 'Value'];
  $scope.doodads = $http.get('/doodads.json').then(function(response) {
    $scope.doodads = response.data.doodads;
  });
});
