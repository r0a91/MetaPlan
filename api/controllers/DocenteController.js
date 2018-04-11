/**
 * DocenteController
 *
 * @description :: Server-side logic for managing docentes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function (req, res) {
		var mensaje = {error:null, datos:null, mensaje:null}
		var docenteDB=null
		var mallasDB=[]
		async.series([
			consultarUsuario,
			consultarMallas

		],finalizar)

		function consultarUsuario(done) {
			Usuario.findOne(req.session.me)
			.exec(function docenteFounded(err, docenteFounded) {
				if (err) {
					mensaje.error= "Error al consultar docente"
					return res.json(mensaje.error)
				}
				if (!docenteFounded) {
					mensaje.error= "Docente  no encontrado"
					return res.json(mensaje.error)
				}
				docenteDB=docenteFounded
				done()
			})
		}
		function consultarMallas(done) {
			Malla.find({docente:req.session.me})
			.populate('nivel')
			.populate('cursos')
			.populate('logros')
			.exec(function mallasFounded(err, mallasFounded ){

				if (err) {
					mensaje.error= "Error al consultar docente"
					return res.json(mensaje.error)
				}
				for (var i = 0; i < mallasFounded.length; i++) {
					mallasDB.push(mallasFounded[i])
				}
				done()

			})
		}
		function finalizar() {
			res.view('docente/index', {
				layout:'layouts/docenteLayout',
				docente: docenteDB,
				mallas: mallasDB
			})
		}


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

	}
};
