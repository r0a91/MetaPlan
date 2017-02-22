/**
 * CreateController
 *
 * @description :: Server-side logic for managing creates
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	newCurso:function (req, res) {
		res.view('forms/curso')
	},
	newNivel:function (req, res) {
		res.view('forms/nivel')
	},
	newPeriodo:function (req, res) {
		res.view('forms/periodo')
	},
	newPermiso:function (req, res) {
		res.view('forms/permiso')
	},
	newUsuario:function (req, res) {
		res.view('forms/usuario')
	},
	newRol: function(req, res) {
		res.view('forms/rol')
	},
	createPermiso: function (req, res) {
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
	},
	createPeriodo: function (req, res) {
		var obj = {
			num_periodo: req.param('num_periodo')
		}

		Periodo.create(obj , function permisoCreated(err, newPeriodo) {
			if (err) {
				console.log(err);
				return res.view('forms/periodo', {
					error : err
				})
			}
			res.json(newPeriodo)
		})
	}
};
