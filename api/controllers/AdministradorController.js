/**
 * AdministradorController
 *
 * @description :: Server-side logic for managing administradors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function (req, res) {
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

			res.view('administrador/index',{
				layout:'layouts/administradorLayout',
				docentes: docentesDB,
				coordinadores:coordinadoresDB,
				administradores:administradoresDB
			})
		}


	}
};
