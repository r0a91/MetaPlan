/**
 * NivelController
 *
 * @description :: Server-side logic for managing nivels
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function (req, res) {
		var obj = {
			nombre: req.param('nombre')
		}

		Nivel.create(obj , function NivelCreated(err, newNivel) {
			if (err) {
				console.log(err);
				return res.view('forms/nivel', {
					error : err
				})
			}
			res.json(newNivel)
		})
	}
};
