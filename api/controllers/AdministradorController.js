/**
 * AdministradorController
 *
 * @description :: Server-side logic for managing administradors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function (req, res) {
		res.send(req.session.me)
	}
};
