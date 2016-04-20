/**
 * Poll.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {

    // The Poll's full name
    // e.g. Nikola Tesla
    title: {
      type: 'string',
      required: true
    },

    // The Poll's title at their job (or something)
    // e.g. Genius
    desc: {
      type: 'string'
    },

    minDate: {
      type: 'string', //'date',
    },

    maxDate: {
      type: 'string', //'date',
      require: true
    }
  }
};
