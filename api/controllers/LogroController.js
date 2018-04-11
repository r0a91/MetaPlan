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
      //console.log("FinalizarLgroController");
      //console.log(malla1);
      res.view('docente/newLogro', {
        layout: 'layouts/docenteLayout',
        malla: malla1,
        periodo: req.param('periodo')
      })
    }

  },
  create: function functionName(req, res, next) {
    //console.log("ENTRO A CREATE LOGRO");
    async.waterfall(
			[
				crearLogro,
				prepararDatosSesion,
				crearSesiones,
			],
			finalizar
		)

    function crearLogro(done) {

      var logroID=""
      var datosLogro={
        malla:req.param('mallaID'),
        num_logro:req.param('num_logro'),
        objetivo_general:req.param('objetivo_general'),
        referentes_teoricos:req.param('referentes_teoricos'),
        fecha_inicio:req.param('fecha_inicio'),
        fecha_final:req.param('fecha_final'),
        evaluacion: req.param('evaluacion'),
        observacion_docente: req.param('observacion_docente'),
        periodo: req.param('periodo')
      }

      console.log("Entro a crear Logro");
      Logro.create(datosLogro).exec(function (err, logroCreated) {
        if (err) {
          return done(err)
        }
        console.log("LogroID");
        console.log(logroCreated.id);
        logroID=logroCreated.id
        console.log("Creo Logro exitosamente");
        done(null, logroID)
      })
    }

    function prepararDatosSesion(logroID, done) {
      console.log("Entro a prepararDatosSesion");
      console.log("LogroID");
      console.log(logroID);



      Malla.findOne({id: req.param('mallaID')})
      .populate('cursos')
      .exec(function (err, mallaFounded) {
        if (err) {
          console.log("Error consultar malla");
          return done()
        }

        var datosSesiones=null
        if (Array.isArray(req.param('num_sesion'))) {
          console.log("Tiene Varios Elementos");
          var datosSesiones={
            num_sesion:req.param('num_sesion'),
            logro:logroID,
            tema:req.param('tema'),
            etapa_del_modelo:req.param('etapa_del_modelo'),
            tecnica_de_ensenanza:req.param('tecnica_de_ensenanza'),
            recursos:req.param('recursos'),
            descripcion_de_la_actividad:req.param('descripcion_de_la_actividad'),
            fechas:req.param('fecha'),
            cursos:mallaFounded.cursos,
            nivel:mallaFounded.nivel
          }
        }else {
          var datosSesiones={
            num_sesion:[req.param('num_sesion')],
            logro:logroID,
            tema:[req.param('tema')],
            etapa_del_modelo:[req.param('etapa_del_modelo')],
            tecnica_de_ensenanza:[req.param('tecnica_de_ensenanza')],
            recursos:[req.param('recursos')],
            descripcion_de_la_actividad:[req.param('descripcion_de_la_actividad')],
            fechas:req.param('fecha'),
            cursos:mallaFounded.cursos,
            nivel:mallaFounded.nivel
          }
          console.log("Tene un solo elemento o ninguno");
        }

        console.log("datosSesiones");
        console.log(datosSesiones);
        done(null, datosSesiones)
      })

    }


    function crearSesiones(datosSesiones, done) {
      console.log("Entro a crear Sesiones");
      var sesiones=[]
      var num_sesiones=[]
      var logros=[]
      var temas=[]
      var etapas_del_modelo=[]
      var tecnicas_de_ensenanza=[]
      var recursos1=[]
      var descripciones_de_la_actividad=[]
      var fechas=datosSesiones.fechas
      var cursos=[]
      var niveles=[]

      for (var i = 0; i < datosSesiones.num_sesion.length; i++) {
        for (var j = 0; j < datosSesiones.cursos.length; j++) {
          num_sesiones.push(datosSesiones.num_sesion[i])
          logros.push(datosSesiones.logro)
          temas.push(datosSesiones.tema[i])
          etapas_del_modelo.push(datosSesiones.etapa_del_modelo[i])
          tecnicas_de_ensenanza.push(datosSesiones.tecnica_de_ensenanza[i])
          recursos1.push(datosSesiones.recursos[i])
          descripciones_de_la_actividad.push(datosSesiones.descripcion_de_la_actividad[i])
          cursos.push(datosSesiones.cursos[j])
          niveles.push(datosSesiones.nivel)
        }
      }
      for (var i = 0; i < fechas.length; i++) {
        var sesion={
          num_sesion:num_sesiones[i],
          logro:logros[i],
          tema:temas[i],
          etapa_del_modelo:etapas_del_modelo[i],
          tecnica_de_ensenanza:tecnicas_de_ensenanza[i],
          recursos:recursos1[i],
          descripcion_de_la_actividad:descripciones_de_la_actividad[i],
          fecha:fechas[i],
          curso:cursos[i].id,
          nivel:niveles[i]
        }
        console.log("Sesion");
        console.log(sesion);
        sesiones.push(sesion)
      }

      Sesion.create(sesiones).exec(function (err, sesionCreated) {
        if (err) {
          console.log("Ha ocurrido un error en la creacion de las sesiones");
          console.log(err);
          return done()
        }
        console.log("Sesiones creadas");
        done()
      })
    }
    function finalizar() {
      res.redirect('showdocente')
    }
  }
};
