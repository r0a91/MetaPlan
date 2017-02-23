/**
 * RolController
 *
 * @description :: Server-side logic for managing Rols
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  //Registra en la db el rol que se ha creado
  create: function(req, res) {
    var obj = {
      nombre: req.param('nombre'),
      permisos: req.param('permisos')
    }
    console.log(obj);

    Rol.create(obj, function(err, ob) {
      if (err) {
        console.log(err);
        res.redirect('createrol')
        return;
      }
      res.redirect('rol')
    })
  }
};
