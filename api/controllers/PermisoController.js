/**
 * PermisoController
 *
 * @description :: Server-side logic for managing Permisoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  new: function(req, res) {
    console.log('entre al formulario de crear Permiso');
    res.view('usuario/newPermiso');
  },
  create: function(req, res) {

    var obj = {
      num_permiso: req.param('num_permiso')
    }

    Permiso.create(obj, function(err, ob) {
      if (err) {
        console.log(err);
        res.redirect('createpermiso')
        return;
      }
      res.redirect('permiso')
    })
  }
};
