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
  var total = null;
  var links = null;
  var pages = null;

  updateDoodads();

  $scope.jsonIntercept = function(url, $event) {
    $event.preventDefault();
    updateDoodads(url);
  };

  function updateDoodads(url) {
    var url = url || '/doodads.json?page=1'
    $http.get(url).then(function(response) {
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
