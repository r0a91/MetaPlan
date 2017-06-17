/**
 * LogroController
 *
 * @description :: Server-side logic for managing Logroes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  new: function (req, res) {

    var malla1=null

    async.series([
      consultarMalla,
    ],finalizar)

    function consultarMalla(done) {
      Malla.findOne({id:req.param('id')})
			.populate('nivel')
			.populate('cursos')
			.populate('logros')
			.exec(function mallasFounded(err, mallaFounded ){

				if (err) {
					mensaje.error= "Error al consultar docente"
					return res.json(mensaje.error)
				}
				malla1=mallaFounded
				done()

			})
    }

    function finalizar() {
      console.log("FinalizarLgroController");
      console.log(malla1);
      res.view('docente/newLogro', {
        layout: 'layouts/docenteLayout',
        malla: malla1,
        periodo: req.param('periodo')
      })
    }

  }
};
