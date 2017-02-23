/**
 * CoordinadorController
 *
 * @description :: Server-side logic for managing coordinadors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function (req, res) {
		res.view('coordinador/index')
	}
};
