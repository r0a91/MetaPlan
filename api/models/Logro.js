/**
 * Logro.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    periodo: {
      model: 'periodo'
    },
    num_logro: {
      type: 'integer'
    },
    objetivo_general: {
      type: 'string'
    },
    referentes_teoricos:{
      type: 'string'
    },
    numero_sesiones:{
      type:'integer'
    },
    sesion:{
      collection:'sesion',
      via:'logro'
    },
    fecha_inicio:{
      type:'date'
    },
    fecha_final:{
      type:'date'
    }
  }
};
