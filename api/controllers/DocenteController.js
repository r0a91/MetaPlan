/**
 * DocenteController
 *
 * @description :: Server-side logic for managing docentes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function (req, res) {
		res.view('docente/index')
	}
};
