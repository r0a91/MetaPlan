/**
 * CursoController
 *
 * @description :: Server-side logic for managing Cursoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  new: function(req, res) {
    console.log('entre al formulario de crear Nivel');
    res.view('malla/newNivel');
  },
  create: function(req, res) {

    var obj = {
      nombre: req.param('nombre')
    }

    Nivel.create(obj, function(err, ob) {
      if (err) {
        console.log(err);
        res.redirect('createnivel')
        return;
      }
      res.redirect('nivel')
    })

  }
};
