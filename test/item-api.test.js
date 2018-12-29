require('../babel');
const axios = require('axios');
const { expect } = require('chai');
const { initDb, initServer } = require('./helpers');

const dbName = 'base-app';
const coll = 'items';

describe('api', () => {
  let server;
  let db;

  before(async () => {
    db = await initDb(dbName, coll);
    server = await initServer();
    await server.start();
  });

  after(async () => {
    await server.stop();
  });

  beforeEach(async () => {
    await db.removeAll();
  });

  describe('get /api/items', async () => {
    it('reponds with an array', async () => {
      const { data } = await axios.get(`${server.getDomain()}/api/items`);

      expect(data).to.be.an('array').with.length(0);
    });
    it('reponds with a list of items in the db', async () => {
      await db.insertMany([{ key1: 'val1' }]);

      const { data } = await axios.get(`${server.getDomain()}/api/items`);

      expect(data).to.be.an('array').with.length(1);
      expect(data[0]).to.include({ key1: 'val1' });
    });
  });

  describe('get /api/item/:id', async () => {
    it('reponds an item that matched the id', async () => {
      await db.insertMany([{ id: '90', key1: 'val1' }]);

      const { data } = await axios.get(`${server.getDomain()}/api/item/90`);

      expect(data).to.be.an('object').that.includes({ id: '90', key1: 'val1' });
    });
  });

  describe('put /api/item/:id', async () => {
    it('creates a new document in the db', async () => {
      await axios.put(`${server.getDomain()}/api/item`, { key2: 'val78' });

      const dbDocs = await db.getAll();
      expect(dbDocs).to.be.an('array').with.length(1);
      expect(dbDocs[0]).to.be.an('object').that.includes({ key2: 'val78' });
      expect(dbDocs[0]).to.include.keys(['id']);
      expect(dbDocs[0].id).to.be.a('string').with.length(36); // is a uuidv4
    });
  });

  describe('post /api/item/:id', async () => {
    it('updates the document with that id in the db', async () => {
      await db.insertMany([{ id: '90', key1: 'val1', key2: 'val2' }, { id: 91, key2: 'val83' }]);

      await axios.post(`${server.getDomain()}/api/item/90`, { key2: 'newVal' });

      const dbDocs = await db.getAll();
      expect(dbDocs).to.be.an('array').with.length(2);
      expect(dbDocs[0]).to.include({ key1: 'val1', key2: 'newVal' });
      expect(dbDocs[1]).to.include({ key2: 'val83' });
    });
  });

  describe('delete /api/item/:id', async () => {
    it('deletes the document with that id in the db', async () => {
      await db.insertMany([{ id: '90', key2: 'val2' }, { id: 91, key2: 'val83' }]);

      await axios.delete(`${server.getDomain()}/api/item/90`);

      const dbDocs = await db.getAll();
      expect(dbDocs).to.be.an('array').with.length(1);
      expect(dbDocs[0]).to.include({ key2: 'val83' });
    });
  });

});