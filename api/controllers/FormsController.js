/**
 * CreateController
 *
 * @description :: Server-side logic for managing creates
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	newCurso:function (req, res) {
		//Renders the form forms/curso
		res.view('forms/curso', {
			layout: 'layouts/administradorLayout'
		})
	},
	newNivel:function (req, res) {
		//Renders the form forms/nivel
		res.view('forms/nivel', {
			layout: 'layouts/administradorLayout'
		})
	},
	newPermiso:function (req, res) {
		//Renders the form forms/permiso
		res.view('forms/permiso', {
			layout: 'layouts/administradorLayout'
		})
	},
	newUsuario:function (req, res) {
		//Renders the form forms/usuario
		res.view('forms/usuario', {
			layout: 'layouts/administradorLayout'
		})
	},
	newRol: function(req, res) {
		//Renders the form forms/rol
		res.view('forms/rol', {
			layout: 'layouts/administradorLayout'
		})
	}


};
