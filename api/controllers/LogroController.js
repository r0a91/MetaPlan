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

  },
  create: function functionName(req, res, next) {
    console.log("ENTRO A CREATE LOGRO");
    var datosLogro={
      malla:req.param('mallaID'),
      num_logro:req.param('num_logro'),
      objetivo_general:req.param('objetivo_general'),
      referentes_teoricos:req.param('referentes_teoricos'),
      fecha_inicio:req.param('fecha_inicio'),
      fecha_final:req.param('fecha_final'),
      recursos:req.param('recursos'),
      evaluacion: req.param('evaluacion'),
      observacion_docente: req.param('observacion_docente'),
      periodo: req.param('periodo')
    }

    var logroID=""


    async.series([
      crearLogro,
      prepararDatosSesion,
      crearSesiones
    ],finalizar)



    function crearLogro(done) {
      Logro.create(datosLogro).exec(function (err, logroCreated) {
        if (err) {
          return done(err)
        }
        logroID=logroCreated.id
        done()
      })
      console.log(datosLogro);

    }

    function prepararDatosSesion(done) {
      Malla.findOne({id: req.param('mallaID')})
      .exec(function (err, mallaFounded) {
        if (err) {
          return done()
        }
        var datosSesiones={
          num_sesion:req.param('num_sesion'),
          logro:logroID,
          descripcion:req.param('descripcion'),
          fechas:req.param('fecha'),
          cursos:mallaFounded.curso,
          nivel:mallaFounded.nivel
        }
        done(datosSesiones)
      })
    }


    function crearSesiones(datosSesiones, done) {

      var sesiones=[]
      var num_sesiones=[]
      var logros=[]
      var descripciones=[]
      var fechas=datosSesiones.fechas
      var cursos=[]
      var niveles=[]

      for (var i = 0; i < datosSesiones.num_sesion.length; i++) {
        for (var j = 0; j < datosSesiones.cursos.length; j++) {
          num_sesiones.push(datosSesiones.num_sesion[i])
          logros.push(datosSesiones.logro)
          descripciones.push(datosSesiones.descripcion[i])
          cursos.push(datosSesiones.cursos[j])
          niveles.push(datosSesiones.nivel)
        }
      }
      for (var i = 0; i < fechas.length; i++) {
        var sesion={
          num_sesion:num_sesiones[i],
          logro:logros[i],
          descripcion:descripciones[i],
          fecha:fechas[i],
          curso:cursos[i],
          nivel:niveles[i]
        }
        console.log("Sesion");
        console.log(sesion);
        sesiones.push(sesion)
      }
      for (var i = 0; i < sesiones.length; i++) {
        Sesion.create(sesiones[i]).exec(function (err, sesionCreated) {
          if (err) {
            return done()
          }
        })
      }

      console.log("Sesiones creadas");
      done()
    }
    function finalizar() {
      res.redirect('showdocente')
    }
  }
};
