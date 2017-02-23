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
	}


};
