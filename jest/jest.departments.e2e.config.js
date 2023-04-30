const baseConfig = require('./jest.base.config');

module.exports = Object.assign(baseConfig, {
  testRegex: 'apps/departments/.*\\.e2e-spec\\.ts$',
  testTimeout: 10000,
});
