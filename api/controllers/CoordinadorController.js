/**
 * CoordinadorController
 *
 * @description :: Server-side logic for managing coordinadors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function (req, res) {
		res.view('coordinador/index')
	},
	edit: function (req, res, next) {
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
	},
	agregar: function (req, res) {
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
			res.view('coordinador/agregar', {
				layout: 'layouts/administradorLayout',
				user: user,
				docentes:docentes
			})
		}
	},
	agregardocentes:function (req, res) {
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


	}
};
