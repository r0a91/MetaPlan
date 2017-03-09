/**
 * MallaController
 *
 * @description :: Server-side logic for managing Mallas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	new: function (req, res) {
		var usuarioDB = null
		var nivelesDB =[]
		var cursosDB = []
		var periodosDB = []

		async.series([
			consultarUsuario,
			consultarNiveles,
			consultarCursos,
			consultarPeriodos
		],finalizar)

		function consultarUsuario(done) {
			Usuario.findOne(req.param('id'))
			.exec(function (err, userFounded) {
				if (err) {
					return res.json(err)
				}
				if (!userFounded) {
					return res.json("Usuario no encontrado")
				}
				usuarioDB = userFounded
				done()
			})
		}

		function consultarNiveles(done) {
			Nivel.find()
			.exec(function (err, nivelesFounded) {
				if (err) {
					return res.json(err)
				}
				if (!nivelesFounded) {
					return res.json("niveles no encontrados")
				}
				for (var i = 0; i < nivelesFounded.length; i++) {
					nivelesDB.push(nivelesFounded[i])
				}
				done()
			})
		}


		function consultarCursos(done) {
			Curso.find()
			.exec(function (err, cursosFounded) {
				if (err) {
					return res.json(err)
				}
				if (!cursosFounded) {
					return res.json("cursos no encontrados")
				}
				for (var i = 0; i < cursosFounded.length; i++) {
					cursosDB.push(cursosFounded[i])
				}
				done()
			})
		}


		function consultarPeriodos(done) {
			Periodo.find()
			.exec(function (err, periodosFounded) {
				if (err) {
					return res.json(err)
				}
				if (!periodosFounded) {
					return res.json("Periodos no encontrados")
				}
				for (var i = 0; i < periodosFounded.length; i++) {
					periodosDB.push(periodosFounded[i])
				}
				done()
			})
		}


		function finalizar() {
			res.view('forms/malla', {
				layout: 'layouts/administradorLayout',
				usuario:usuarioDB,
				niveles:nivelesDB,
				cursos: cursosDB,
				periodos: periodosDB
			})
		}
	},
	create:function (req, res) {
		console.log("ENtro a create malla");

		var mensaje = {error:null, datos:null, mensaje:null}
    var per = []

		async.series([
			consultarPeriodos,
		],finalizar)

		function consultarPeriodos(done) {
			Periodo.find()
			.exec(function (err, periodosDB) {
				if (err) {
					mensaje.error="Problemas al consultar Periodos"
					return done()
				}
				for (var i = 0; i < periodosDB.length; i++) {
					per.push(periodosDB[i])
				}
				done()
			})
		}

		function finalizar() {
			mallaobj={
				docente:req.param('id'),
				asignatura:req.param('asignatura'),
				nivel:req.param('nivel'),
				cursos:req.param('cursos'),
				periodos:per
			}
			console.log(req.param('cursos'));

			Malla.create(mallaobj, function mallaCreated(err, NewMalla) {
				if (err) {
					mensaje.error="Problemas la crear Mallas"
					return res.json(mensaje.error)
				}
				res.redirect('/showadministrador')
			})
		}
	}
};
