angular.module('AdministradorAPP.controllers', [])
.controller('ShowPermisosCtrl', ['$scope', '$http', function($scope, $http) {
  console.log("ENTRO A ShowPermisosCtrl");
  $http({
    method: 'GET',
    url: '/permiso'
  }).then(function successCallback(response) {
      $scope.permisos = response.data;
      console.log($scope.permisos);
    },
    function errorCallback(response) {
      console.log(response.statusText);
  });

}])
.controller('showRolesCtrl', ['$scope', '$http', function($scope, $http) {

  $http({
    method: 'GET',
    url: '/rol'
  }).then(function successCallback(response) {
      $scope.roles = response.data;
      console.log($scope.roles);
    },
    function errorCallback(response) {
      console.log(response.statusText);
  });

}])
