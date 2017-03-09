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
.controller('ShowNivelesCtrl', ['$scope', '$http', function($scope, $http) {
  console.log("ENTRO A ShowNivelesCtrl");
  $http({
    method: 'GET',
    url: '/nivel'
  }).then(function successCallback(response) {
      $scope.niveles = response.data;
      console.log($scope.niveles);
    },
    function errorCallback(response) {
      console.log(response.statusText);
  });

}])
.controller('ShowCursosCtrl', ['$scope', '$http', function($scope, $http) {
  console.log("ENTRO A ShowCursosCtrl");
  $http({
    method: 'GET',
    url: '/curso'
  }).then(function successCallback(response) {
      $scope.cursos = response.data;
      console.log($scope.cursos);
    },
    function errorCallback(response) {
      console.log(response.statusText);
  });

}])
