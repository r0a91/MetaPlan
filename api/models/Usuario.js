/**
 * Usuario.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    email: {
      type: 'email',
      required: true,
      unique: true
    },
    telefono_celular: {
      type: 'string',
    },
    rol: {
      model: 'rol'
    },
    persona: {
      model: 'persona'
    },
    profesores_a_cargo: {
      collection: 'coordinador_Docente',
      via: 'id_profesor'
    },
    mallas: {
      collection: 'malla',
      via: 'docente'
    }
  }
};
