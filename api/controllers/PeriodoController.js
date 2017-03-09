/**
 * PeriodoController
 *
 * @description :: Server-side logic for managing periodoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function (req, res) {
		var obj = {
			num_periodo: req.param('num_periodo')
		}

		Periodo.create(obj , function periodoCreated(err, newPeriodo) {
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
