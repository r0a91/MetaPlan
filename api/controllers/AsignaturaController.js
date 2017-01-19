/**
 * AsignaturaController
 *
 * @description :: Server-side logic for managing Asignaturas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  new: function(req, res) {
    console.log('entre al formulario de crear Nivel');
    res.view('malla/newAsignatura');
  },
  create: function(req, res) {

    var obj = {
      nombre: req.param('nombre')
    }

    Asignatura.create(obj, function(err, ob) {
      if (err) {
        console.log(err);
        res.redirect('createasignatura')
        return;
      }
      res.redirect('asignatura')
    })

  }
};
