/**
 * PermisoController
 *
 * @description :: Server-side logic for managing permisoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function (req, res) {
		var obj = {
			num_permiso: req.param('num_permiso')
		}

		Permiso.create(obj , function permisoCreated(err, newPermiso) {
			if (err) {
				console.log(err);
				return res.view('forms/permiso', {
					error : err
				})
			}
			res.view('administrador/index')
		})
	}
};
