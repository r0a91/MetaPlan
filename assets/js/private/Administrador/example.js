angular.module('AdministradorAPP.controllers', []).controller('SesionCtrl', ['$scope', function($scope) {
  var sesiones = $scope.sesiones = [];

  $scope.addSesion = function(num, desc, date) {
    var ses = {
      num_sesion: num,
      descripcion: desc,
      fecha: date
    }
    sesiones.push(ses)
    console.log(ses);
  };
}]).controller('CursoCtrl', ['$scope', '$http', function($scope, $http) {
  $http({
    method: 'GET',
    url: '/curso'
  }).then(function successCallback(response) {
    $scope.cursos = response.data
    console.log($scope.cursos);
  }, function errorCallback(response) {
    console.log(response.statusText);
  });
}]).controller('LogroCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.logroCreate = function() {}
}]).controller('RolCtrl', ['$scope', '$http', function($scope, $http) {
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