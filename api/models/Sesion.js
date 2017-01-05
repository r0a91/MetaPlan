/**
 * Sesion.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    num_sesion:{
      type:'integer',
      autoIncrement: true
    },
    descripcion:{
      type:'string'
    },
    curso:{
      model:'curso'
    },
    fecha:{
      type:'date'
    }
  }
};
