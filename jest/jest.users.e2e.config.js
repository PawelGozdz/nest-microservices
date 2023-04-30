const baseConfig = require('./jest.base.config');

module.exports = Object.assign(baseConfig, {
  testRegex: 'apps/users/.*\\.e2e-spec\\.ts$',
  testTimeout: 10000,
});
