/**
 * Malla.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    docente: {
      model: 'usuario'
    },
    asignatura: {
      model: 'asignatura'
    },
    nivel: {
      model: 'nivel'
    },
    cursos: {
      collection: 'curso',
      via: 'malla',
      through: 'malla_curso'
    },
    periodos: {
      collection: 'periodo',
      via: 'malla',
      through: 'malla_periodo'
    }
  }
};
