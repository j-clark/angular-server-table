var app = angular.module('angularServerTable', function() {

});

app.directive('serverTable', function() {
  return {
    // scope: {'doodads': '='},
    templateUrl: 'templates/table.html',
    replace: true,
    link: function(scope, elem, attrs) {
      elem.find('#previous-page').click(function() {
        scope.previousPage();
        scope.$apply();
      });

      elem.find('#next-page').click(function() {
        scope.nextPage();
        scope.$apply();
      });
    }
  };
});

app.controller('TableController', function($scope, $http) {
  $scope.page = 1;
  $scope.headers = ['Name', 'Value'];
  $scope.doodads = $http.get('/doodads.json').then(function(response) {
    $scope.total = response.data.total;
    $scope.doodads = response.data.doodads;
  });

  $scope.previousPage = function() {
    $scope.page -= 1;
    $scope.doodads = $http.get('/doodads.json', {params: {page: $scope.page}}).then(function(response) {
      $scope.doodads = response.data.doodads;
    });
  };

  $scope.nextPage = function() {
    $scope.page += 1;
    $scope.doodads = $http.get('/doodads.json', {params: {page: $scope.page}}).then(function(response) {
      $scope.doodads = response.data.doodads;
    });
  };

  $scope.notFirstPage = function() {
    return $scope.page > 1;
  };

  $scope.hasMore = function() {
    return $scope.page * 10 < $scope.total;
  };
});
