/**
 * CoordinadorController
 *
 * @description :: Server-side logic for managing coordinadors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	index: function (req, res) {
		//Load the index view for users with Coordinador rol
		var coordinadorDB = null;
		var docentesCoordinador= null;
		var docentesDB=[];
		var idsDocentes=[];
		var mallasDB=[];
		async.series([
			consultarCoordinador_Docente,
			consultarDocentes,
			consultarMallas
		],finalizar)

		function consultarCoordinador_Docente(done) {
			console.log("Mi id de session es")
			console.log(req.session.me)
			Usuario.findOne(req.session.me)
			.populate('profesores_a_cargo')
			.exec(function (err, userFounded) {
				if (err) {
					console.log("Error al consultar usuario")
				}
				console.log("ENTRO A COORDINADORCONTROLER-> consultarCoordinador_Docente")
				//console.log(userFounded)
				coordinadorDB= userFounded
				docentesCoordinador=userFounded.profesores_a_cargo
				//console.log(docentesCoordinador)
				done()
			})
			
		}

		function consultarDocentes(done) {
			Usuario.find()
			.populate('mallas')
			.exec(function (err, usersFounded) {
				if (err) {
					console.log("Error al consultar usuarios")
				}
				for (var i = 0; i < usersFounded.length; i++) {
					for (var j = 0; j < docentesCoordinador.length; j++) {
						if (usersFounded[i].id == docentesCoordinador[j].id_profesor) {
							docentesDB.push(usersFounded[i]) 
							idsDocentes.push(usersFounded[i].id)
						}
					}	
				}
				//console.log("Los docentes de este coordinador son:")
				console.log(docentesDB)
				done()
			})
		}
		function consultarMallas(done) {
			
			Malla.find()
			.populate('nivel')
			.populate('cursos')
			.populate('logros')
			.exec(function (err, mallasFounded) {
				if (err) {
					console.log(err)
				}

				for (var i = 0; i < docentesDB.length; i++) {
					for (var j = 0; j < docentesDB[i].mallas.length; j++) {
						for (var k = 0; k < mallasFounded.length; k++) {
							if (mallasFounded[k].id==docentesDB[i].mallas[j].id) {
								mallasDB.push(mallasFounded[k])
							}
						}	
					}
				}
				console.log("MALLAS BUSCADAS y COMPARADAS")
				console.log(mallasDB)
				done()
			})
		}

		function finalizar() {
			res.view('coordinador/index', {
				layout:'layouts/administradorLayout', 
				coordinador: coordinadorDB , 
				docentesACargo: docentesDB , 
				mallas: mallasDB
			})
		}

	},
	agregarComentarios: function (req, res) {
		
	}
};
