/**
 * Periodo.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    num_periodo: {
      type: 'string',
      enum: ['01', '02', '03', '04']
    },
    mallas: {
      collection: 'malla',
      via: 'periodo',
      through: 'malla_periodo'
    },
    logros: {
      collection: 'logro',
      via: 'periodo'
    }

  }
};
