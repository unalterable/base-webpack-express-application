const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017/';

const storeActions = {
  insertDocuments: newDocuments => MongoClient
    .connect(url)
    .then(db => db.db('base_app').collection('collection1')
      .insertMany(newDocuments)
      .then(result => console.log('result', result))
      .then(() => db.close()))
};

module.exports = storeActions;