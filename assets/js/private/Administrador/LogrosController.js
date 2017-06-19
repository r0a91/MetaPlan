angular.module('AdministradorAPP.controllers', [])
.controller('SesionCtrl', ['$scope', function($scope) {
  var sesiones = $scope.sesiones = [];
  var numsesiones = $scope.numsesiones =[]
  var descripciones = $scope.descripciones =[]
  var cursosSesiones = $scope.cursosSesiones =[]
  var fechasSesiones = $scope.fechasSesiones =[]

  $scope.addSesion = function(desc) {
    var curso=[]
    $(".cursostext").each(function() {
      curso.push($(this).val());
    });

    var fechas=[]

    $(".fechascursos").each(function() {
      fechas.push($(this).val());
    });

    var num=[]
    num.push(sesiones.length +1)

    var d=[desc]

    var ses = {
      num_sesion:num,
      descripcion: d,
      cursosesion: curso,
      fechasesion: fechas
    }
    numsesiones.push(num)
    descripciones.push(d)
    cursosSesiones.push(curso)
    fechasSesiones.push(fechas)
    sesiones.push(ses)
    console.log(ses.num_sesion);
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
}]).controller('ShowPermisosCtrl', ['$scope', '$http', function($scope, $http) {
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
