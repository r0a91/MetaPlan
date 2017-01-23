/**
 * UsuarioController
 *
 * @description :: Server-side logic for managing Usuarios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  new: function(req, res) {
    console.log('entre al formulario de crear USUARIO');
    res.view('usuario/newUsuario');
  },
  create: function(req, res) {
    var obj = {
      nombre: req.param('nombre'),
      apellido: req.param('apellido'),
      nit: req.param('nit'),
      email: req.param('email'),
      rol: req.param('rol')
    }
    Usuario.create(obj, function(err, ob) {
      if (err) {
        console.log(err);
        res.redirect('createusuario')
        return;
      }
      res.redirect('usuario/showusuario/' + ob.id)
    })
  },
  showusuario: function(req, res, next) {
    Usuario.findOne(req.param('id'), function userFounded(err, user) {
      if (err) {
        return next(err)
      }
      res.view({
        usuario: user
      })
    });
  }

};
