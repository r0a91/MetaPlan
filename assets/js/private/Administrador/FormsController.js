angular.module('AdministradorAPP.controllers', [])
.controller('PermisoCtrl', ['$scope', '$http', function($scope, $http) {

  $scope.SubmitPermisoForm = function functionName() {
    $http.post('/createPermiso', {
      num_permiso:$scope.permisoForm.num_permiso
    })
    .then( function OnSuccess(sailsResponse) {
      window.location = '/'
    })
    .catch(function OnError(sailsResponse) {
      console.log(sailsResponse);
    })
    .finally(function EitherWay() {
      console.log("Intente Registrar");
    })
  }
}])
.controller('PeriodoCtrl', ['$scope', '$http', function($scope, $http) {

  $scope.SubmitPeriodoForm = function functionName() {
    $http.post('/createPeriodo', {
      num_periodo:$scope.periodoForm.num_periodo
    })
    .then( function OnSuccess(sailsResponse) {
      window.location = '/'
    })
    .catch(function OnError(sailsResponse) {
      console.log(sailsResponse);
    })
    .finally(function EitherWay() {
      console.log("Intente Registrar");
    })
  }
}])
