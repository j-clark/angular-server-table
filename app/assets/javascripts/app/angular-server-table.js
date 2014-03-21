var app = angular.module('angularServerTable', function() {

});

app.directive('serverTable', function(localeService) {
  return {
    templateUrl: function(_, attrs) {
      return 'templates/table_' + localeService.getLocale() + '.html';
    },
  };
});

app.controller('TableController', function($scope, $http, localeService) {
  var orderProperty = null;
  var total = null;
  var links = null;
  var orderDirection = 'asc';

  updateDoodads();

  $scope.jsonIntercept = function(url, $event) {
    $event.preventDefault();
    updateDoodads(url);
  };

  $scope.order = function(property) {
    if(property === orderProperty) {
      toggleDirection();
    }

    orderProperty = property;
    updateDoodads();
  };

  function toggleDirection() {
    if(orderDirection === 'asc') {
      orderDirection = 'desc';
    } else {
      orderDirection = 'asc';
    }
  }

  function updateDoodads(url) {
    var url = url || '/doodads.json?page=1'
    $http.get(url, {
      params: {
        orderProperty: orderProperty,
        orderDirection: orderDirection
      }
    }).then(function(response) {
      total = response.data.total;
      links = response.data.links;
      $scope.doodads = response.data.doodads;
      $scope.pages = links.pages
      $scope.links = links
    });
  }
});

app.service('localeService', function() {
  var locale = 'en';
  return {
    getLocale: function() {
      return locale;
    }
  };
});
