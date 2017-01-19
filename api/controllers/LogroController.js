/**
 * LogroController
 *
 * @description :: Server-side logic for managing Logroes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  new: function(req, res) {
    console.log('entre al formulario de crear Logro');
    res.view('logro/newLogro');
  }
};
