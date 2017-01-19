/**
 * RolController
 *
 * @description :: Server-side logic for managing Rols
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  //Carga el formulario de creacion de Roles
  new: function(req, res) {
    console.log('entre al formulario de crear ROL');

    var mensaje = {
      error: null,
      datos: null,
      mensaje: null
    }
    var objs1 = null

    async.series(
      [
        obtenerDatos,
      ],
      finalizar
    )

    function obtenerDatos(done) {
      Permiso.find().exec(function(err, permisos) {
        if (err) {
          mensaje.error = err
          done()
        } else {
          objs1 = permisos
          done()
        }
      })
    }

    function finalizar() {
      if (mensaje.error) {
        return res.json(mensaje)
      }
      res.view('usuario/newRol', {
        permisos: objs1
      });
    }

  },
  //Registra en la db el rol que se ha creado
  create: function(req, res) {
    var obj = {
      nombre: req.param('nombre'),
      permisos: req.param('permisoid')
    }

    Rol.create(obj, function(err, ob) {
      if (err) {
        console.log(err);
        res.redirect('createrol')
        return;
      }
      res.redirect('rol')
    })
  }
};
