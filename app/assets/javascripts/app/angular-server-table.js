var app = angular.module('angularServerTable', function() {

});

app.directive('serverTable', function(localeService) {

  return {

    templateUrl: function(_, attrs) {
      return 'templates/table_' + localeService.getLocale() + '.html';
    },

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

app.controller('TableController', function($scope, $http, localeService) {
  var orderProperty = null;
  var total = null;
  var links = null;
  var orderDirection = 'asc';

  updateDoodads();

  $scope.previousPage = function() {
    updateDoodads(links.prevPage);
  };

  $scope.nextPage = function() {
    updateDoodads(links.nextPage);
  };

  $scope.order = function(property) {
    if(property === orderProperty) {
      toggleDirection();
    }

    orderProperty = property;
    updateDoodads();
  };

  $scope.notFirstPage = function() {
    return links.prevPage;
  };

  $scope.hasMore = function() {
    return links.nextPage;
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
      $scope.doodads = response.data.doodads;
      total = response.data.total;
      links = response.data.links;
    });
  }
});

app.service('localeService', function() {
  var locale = 'fr';
  return {
    getLocale: function() {
      return locale;
    }
  };
});
