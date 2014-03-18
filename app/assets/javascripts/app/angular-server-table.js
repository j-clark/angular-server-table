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
  var page = 1;
  var orderProperty = null;
  var total = null;
  var orderDirection = "asc";
  $scope.headers = ['Name', 'Value'];

  $scope.doodads = $http.get('/doodads.json').then(function(response) {
    total = response.data.total;
    $scope.doodads = response.data.doodads;
  });

  $scope.previousPage = function() {
    page -= 1;
    updateDoodads();
  };

  $scope.nextPage = function() {
    page += 1;
    updateDoodads();
  };

  $scope.order = function(property) {
    if(property === orderProperty) {
      toggleDirection();
    }

    orderProperty = property;
    updateDoodads();
  };

  $scope.notFirstPage = function() {
    return page > 1;
  };

  $scope.hasMore = function() {
    return page * 10 < total;
  };

  function toggleDirection() {
    if(orderDirection === "asc") {
      orderDirection = "desc";
    } else {
      orderDirection = "asc";
    }
  }

  function updateDoodads() {
    $scope.doodads = $http.get('/doodads.json', {
      params: {
        page: page,
        orderProperty: orderProperty,
        orderDirection: orderDirection
      }
    }).then(function(response) {
      $scope.doodads = response.data.doodads;
    });
  }
});
