/**
 * AdministradorController
 *
 * @description :: Server-side logic for managing administradors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	vincular: function (req, res) {


		console.log("ENTRO A AGREGAR DOCENTEASDASDASDASD")
		
		//Execute the method to show all the Docentes in view coordinador/agregarDocente.
		
		user=null
		docentes=[]

		async.series([
			consultarCoordinador,
 			consultarDocentes
		],finalizar)

		function consultarCoordinador(done) {
			Usuario.findOne(req.param('id'), function (err, userFounded) {
				if (err) {
					return done()
				}
				user=userFounded
				done()
			})
		}

		function consultarDocentes(done) {

			Usuario.find()
			.populate('rol')
			.exec(function (err, usersFounded) {
				if (err) {
					return done()
				}
				//console.log(usersFounded);
				for (var i = 0; i < usersFounded.length; i++) {
					console.log(usersFounded[i]);
					if (usersFounded[i].rol) {
						if (usersFounded[i].rol.nombre=="Docente") {
							docentes.push(usersFounded[i])
						}
					}
				}
				done()
			})
		}

		function finalizar() {
			res.view('administrador/agregarDocente', {
				layout: 'layouts/administradorLayout',
				user: user,
				docentes:docentes
			})
		}
		
	},
	index: function (req, res) {
		//shows the administrator index view. The one loaded when the user logged as administrator

		var mensaje = {error:null, datos:null, mensaje:null}
		var roles=[]
		var docentesDB=[]
		var coordinadoresDB=[]
		var administradoresDB=[]

		console.log(req.session.me);

		async.series([
			consultarRoles,
			dividirUsuarios

		],finalizar)

		function consultarRoles(done) {
			//Consults the Roles in the DB
			Rol.find().populate('usuarios')
			.exec(function (err, rolesDB) {
				if (err) {
					mensaje.error = "Hubo un problema al consultar roles"
					return done()
				}
				if (rolesDB.length==0) {
					mensaje.error = "No se encontraron roles roles"
					return done()
				}
				for (var i = 0; i < rolesDB.length; i++) {
					roles.push(rolesDB[i])
				}
				done()
			})
		}
		function dividirUsuarios(done) {
			//Split the users with their respective roles
			for (var i = 0; i < roles.length; i++) {
				if (roles[i].nombre=="Docente") {
					docentesDB=roles[i].usuarios

				}else if (roles[i].nombre=="Coordinador") {
					coordinadoresDB=roles[i].usuarios

				}else {
					administradoresDB=roles[i].usuarios

				}
			}
			done()
		}
		function finalizar() {
			//Load the indexView for users with Administrator rol, and pass as paremeters the users divided by their respective rol
			res.view('administrador/index',{
				layout:'layouts/administradorLayout',
				docentes: docentesDB,
				coordinadores:coordinadoresDB,
				administradores:administradoresDB
			})
		}


	},
	agregardocentes:function (req, res) {
		//Method to add every Docente to the specific Coordinador.
		console.log("Entro a agregarDocentes");
		var docentes=req.param('docentes')
		console.log("Es array?");
		console.log(Array.isArray(req.param('docentes')));

		if (Array.isArray(req.param('docentes'))) {
			for (var i = 0; i < docentes.length; i++) {
				var obj={
					id_coordinador:req.param('id'),
					id_profesor:docentes[i]
				}
				Coordinador_Docente.create(obj).exec(function (err, docente_agregado) {
					if (err) {
						return res.json(err)
					}
				})
			}
		}else {
			var obj={
				id_coordinador:req.param('id'),
				id_profesor:req.param('docentes')
			}
			Coordinador_Docente.create(obj).exec(function (err, docente_agregado) {
				if (err) {
					return res.json(err)
				}
			})
		}

		res.redirect('showadministrador')


	},
	edit: function (req, res, next) {
		//shows the form for editing users
		Usuario.findOne(req.param('id'), function userFounded(err, user) {
			if (err) {
				return next(err)
			}
			if(!user){
				return next()
			}
			res.view('usuario/edit', {
				layout: 'layouts/administradorLayout',
				user: user
			})
		})
	}
	
};
