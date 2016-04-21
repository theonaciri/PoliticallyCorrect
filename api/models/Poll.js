/**
 * Poll.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {

    title: {
      type: 'string',
      required: true
    },

    desc: {
      type: 'string'
    },

    minDate: {
      type: 'date'
    },

    maxDate: {
      type: 'date',
      require: true
    }
  }
};
