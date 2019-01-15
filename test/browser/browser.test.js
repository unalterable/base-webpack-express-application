const { expect } = require('chai');
const { selenium } = require('../helpers');

describe('Page', () => {
  let browser;

  before(async () => {
    ({ browser } = await selenium.getBrowser());
  });

  it('deletes the document with that id in the db, responds with 200 and no data', async () => {
    const title = await browser.getTitle();
    expect(title).to.equal('Base App');
  });
});
