const sut = require('../src/server/store.js');

describe('store', ()=>{

  const testDocuments = [
    {
    documentProperty: 'test value1',
    },
    {
      documentProperty: 'test value1',
    }
  ]
  ;

  it('saves documents', ()=>
    sut.insertDocuments(testDocuments)
      .then(console.log)
  )
})