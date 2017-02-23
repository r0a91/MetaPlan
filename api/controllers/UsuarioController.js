/**
 * UsuarioController
 *
 * @description :: Server-side logic for managing Usuarios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  create:function (req, res) {
    var obj = {
			nombre: req.param('nombre'),
      apellido: req.param('apellido'),
      nit: req.param('nit'),
      correo: req.param('correo'),
      rol: req.param('rol')
		}

		Usuario.create(obj , function UsuarioCreated(err, newUsuario) {
			if (err) {
				console.log(err);
				return res.view('forms/usuario', {
					error : err
				})
			}
			res.json(newUsuario)
		})
  },
  mostrarLogin: function (req, res) {
    res.view('pages/login', {
      layout:'layouts/publicLayout',
      error: null
    })
  },
  login: function (req, res) {
    var mensaje = {error:null, datos:null, mensaje:null}
    var user = null
    var permisos = []

    var temas = []
		var autorizado = false
		async.series([
			validar,
			consultarUsuario,
			compararDatos,
			generarAutorizacion
		],finalizar)

    function validar(done) {
      if (!req.body.correo) mensaje.error="Correo o Password incorrectos";
      if (!req.body.password) mensaje.error="Correo o Password incorrectos";
      done()
    }
    function consultarUsuario(done) {
      if (mensaje.error) return done();
      Usuario.findOne({correo: req.body.correo})
      .populate('rol')
      .exec(function (err, userDB) {
        if (err) {
          mensaje.error = "Correo o Password incorrectos"
          return done()
        }
        if (!userDB) {
          mensaje.error = "Correo o Password incorrectos"
          return done()
        }
        user=userDB
        done()
      })
    }
    function compararDatos(done) {
      if (mensaje.error) return done();
      if (req.body.correo == user.correo) {
        if (req.body.password == user.nit) {
          autorizado = true
        }else {
          mensaje.error = "Correo o Password incorrectos"
        }

      }else {
        mensaje.error = "Correo o Password incorrectos"
      }
      done()
    }
    function generarAutorizacion(done) {
      if (mensaje.error) return done();
      req.session.regenerate(function(){
				req.session.me = user.id
				req.session.authenticated = autorizado
				done()
			})
    }
    function finalizar() {
      if (mensaje.error) {
        res.view('pages/login', {
					layout: 'layouts/publicLayout',
					error: mensaje.error
				})
      }else {
        console.log(user.rol.nombre);
        if (user.rol.nombre=="Docente") {
          res.redirect('/showdocente')
        }else if (user.rol.nombre=="Coordinador") {
          res.redirect('/showcoordinador')
        }else if (user.rol.nombre=="Administrador"){
          res.redirect('/showadministrador')
        }else{
          mensaje.error = "Usuario no tiene asignado un rol"
          res.json(mensaje.error)
        }
      }
    }
  }
};
