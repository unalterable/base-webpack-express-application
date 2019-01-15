require('../../babel');
const prepare = require('mocha-prepare');
const { mongo, selenium, server } = require('./index');

const skipRemoveMsg = container => console.info(`Not removing ${container} container as it was already running`);

const testWrapper = (() => {
  let usingExistingMongo;
  let usingExistingSelenium;

  return {
    setup: async () => {
      usingExistingMongo = mongo.container.ensureRunning().wasAlreadyRunning;
      usingExistingSelenium = selenium.container.ensureRunning().wasAlreadyRunning;
      await server.start();
    },
    tearDown: async () => {
      await server.stop();
      usingExistingSelenium ? skipRemoveMsg('mongo') : mongo.container.stopAndRemove();
      await selenium.closeBrowser();
      usingExistingMongo ? skipRemoveMsg('selenium') : selenium.container.stopAndRemove();
    },
  };
})();

prepare(
  (done) => testWrapper.setup().catch(console.error).then(done),
  (done) => testWrapper.tearDown().catch(console.error).then(done),
);
