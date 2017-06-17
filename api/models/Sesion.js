/**
 * Sesion.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    num_sesion: {
      type: 'integer',
      autoIncrement: true
    },
    logro: {
      model: 'logro'
    },
    descripcion: {
      type: 'string'
    },
    fecha: {
      type: 'date'
    },
    curso: {
      model:'curso'
    },
    nivel:{
      nivel:'nivel'
    }
  }
};
