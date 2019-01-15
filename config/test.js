const { raw } = require('config/raw');
const mongo = require('../test/helpers/mongo');

module.exports = {
  db: {
    mongo: {
      url: raw(mongo.getUrl()),
    },
  },
};
