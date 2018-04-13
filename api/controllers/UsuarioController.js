/**
 * UsuarioController
 *
 * @description :: Server-side logic for managing Usuarios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  create:function (req, res) {
    //Creates a new User in the DB
    var obj = {
			nombre: req.param('nombre'),
      apellido: req.param('apellido'),
      nit: req.param('nit'),
      correo: req.param('correo'),
      rol: req.param('rol')
		}

		Usuario.create(obj , function UsuarioCreated(err, newUsuario) {
			if (err) {
				return res.view('forms/usuario', {
					error : err
				})
			}
			res.json(newUsuario)
		})
  },
  mostrarLogin: function (req, res) {
    //Shows the login view located in pages/login
    res.view('pages/login', {
      layout:'layouts/publicLayout',
      error: null
    })
  },
  login: function (req, res) {
    //Login a user with a given email and password which is the user nit
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
      //Validates if the email and password are empty or not
      if (!req.body.correo) mensaje.error="Correo o Password incorrectos";
      if (!req.body.password) mensaje.error="Correo o Password incorrectos";
      done()
    }
    function consultarUsuario(done) {
      //get the user with the given email. 
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
      //If there is a user with the email, compares the password which is the nit.
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
      //If the input is correct generates a session and assign the user id to it.
      if (mensaje.error) return done();
      req.session.regenerate(function(){
				req.session.me = user.id
				req.session.authenticated = autorizado
				done()
			})
    }
    function finalizar() {
      //if the input is incorrect shows the login view again.
      if (mensaje.error) {
        res.view('pages/login', {
					layout: 'layouts/publicLayout',
					error: mensaje.error
				})
      }else {
        //If the input is correct shows the respective view for each user. Docente, Coordinador, Administrador
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
  },
  logout: function (req, res) {
    //Destroy the session created in the login proccess and redirect to the login view
    req.session.destroy(function(err) {
      if (err) {
        return res.json(err)
      }
			res.redirect('/login')
		});
  },
  edit: function (req, res, next) {
    // Load the data of the user that has to be edited.
    var user=null
    var mallas=[]
    var profes=[]
    async.series([
			consultarUsuario,
			consultarMallas,
			consultarProfesoresACargo
		],finalizar)

    function consultarUsuario(done) {
      //Search the user given an id
      Usuario.findOne(req.param('id'))
      .exec(function (err, userFounded) {
        if (err) {
          return next(err)
        }
        if (!userFounded) {
          return next()
        }
        user=userFounded
      })
    }

    function consultarMallas(done) {
      //Search the Mallas asociated to the user
      Malla.find({docente:req.param('id')}, function (err, mallasFounded) {
        if (err) {
          return done()
        }
        mallas=mallasFounded
        done()
      })
    }
    function consultarProfesoresACargo(done) {
      //Search the docents asociated to the user
      Coordinador_Docente.find({id_coordinador:req.param('id')}, function (err, profesFounded) {
        if (err) {
          return done()
        }
        profes=profesFounded
        done()
      })
    }
    function finalizar() {
      //Loads the view usuario/edit and pass the information 
      res.view('/usuario/edit', {
        layout:'layouts/administradorLayout',
        user:userFounded,
        mallas:mallas,
        profes:profes
      })
    }

  },
  update: function (req, res, next) {
    //update the user information 
    var userObj = {
      nombre: req.param('nombre'),
      apellido: req.param('apellido'),
      nit:req.param('nit'),
      correo:req.param('correo')
    }
    Usuario.update(req.param('id'), userObj, function userUpdate(err, userUpdated) {
      if (err) {
        req.session.flash ={
          error:err
        }
        return res.redirect('/showadministrador')
      }
      res.redirect('/usuario')
    })
  },
  destroy: function (req, res, next) {
    //Deletes a user given an id.
    var mallasIDs = []
    var logrosIDs = []

    async.series([
      searchMallas,
      searchLogros,
      destruirSesiones,
      destruirLogros,
			destruirMallas,
			destruirDocentesAsignados,
      destruirCoordinadorAsignado
		],finalizar)


    function searchMallas(done) {
      //First search every Malla asociated to the user id
      Malla.find({docente : req.param('id')}, function (err, mallasFounded) {
        if (err) {
          return done()
        } 

        for (var k = 0; k < mallasFounded.length; k++) {
          mallasIDs.push(mallasFounded[k].id)
        }
         
        done()
      })
    }

    function searchLogros(done) {
      //Search every Logro asociated with evert Malla found previously
      Logro.find({malla : mallasIDs}, function (err, logrosFounded) {
        if (err) {
          return done()
        } 

        for (var k = 0; k < logrosFounded.length; k++) {
          logrosIDs.push(logrosFounded[k].id)
        }
         
        done()
      })
    }

    function destruirSesiones(done) {
      //Destroy every Sesion asociated with every Logro found
      Sesion.destroy({logro: logrosIDs}, function (err) {
        if (err) {
          return done()
        }
        done()
      })
    }

    function destruirLogros(done) {
      //Destroy every Logro asociated with every Malla found
      Logro.destroy({id : logrosIDs}, function (err) {
        if (err) {
          return done()
        }
        done()
      })
    }
    function destruirMallas(done) {
      //Destroy every Malla asociated with the user ID
      Malla.destroy({docente : req.param('id')}, function (err) {
        if (err) {
          return done()
        }
        done()
      })
    }

    function destruirDocentesAsignados(done) {
      //Now it can destroy every relationship whith the other users if the user is a Coordinador
      Coordinador_Docente.destroy({id_profesor: req.param('id')}, function (err) {
        if (err) {
          return done()
        }
        done()
      })
    }
    function destruirCoordinadorAsignado(done) {
       //Now it can destroy every relationship whith the other users if the user is a Docente
      Coordinador_Docente.destroy({id_coordinador: req.param('id')}, function (err) {
        if (err) {
          return done()
        }
        done()
      })
    }

    function finalizar() {
      //Finally destroys the given user
      Usuario.destroy(req.param('id'), function userDestroyed(err) {
        if (err) {
          return next(err)
        }
        res.redirect('/showadministrador')
      })
    }
  }
};
