/**
 * CursoController
 *
 * @description :: Server-side logic for managing cursoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function (req, res) {
		//Creates a Curso
		var obj = {
			num_curso: req.param('num_curso')
		}

		Curso.create(obj , function CursoCreated(err, newCurso) {
			if (err) {
				console.log(err);
				return res.view('forms/curso', {
					error : err
				})
			}
			res.json(newCurso)
		})
	}
};
