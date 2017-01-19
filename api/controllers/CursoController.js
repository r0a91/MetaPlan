/**
 * CursoController
 *
 * @description :: Server-side logic for managing Cursoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  new: function(req, res) {
    console.log('entre al formulario de crear Curso');
    res.view('malla/newCurso');
  },
  create: function(req, res) {

    var obj = {
      num_curso: req.param('num_curso')
    }

    Curso.create(obj, function(err, ob) {
      if (err) {
        console.log(err);
        res.redirect('createcurso')
        return;
      }
      res.redirect('curso')
    })

  }
};
