module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '../',
  testEnvironment: 'node',
  runtime: '@side/jest-runtime',
  transform: {
    '^.+\\.(t|j)s$': '@swc/jest',
  },
  setupFiles: ['./jest/setup-tests.ts'],
  /**
   * The order of the mappers is VERY important here.
   * The mapper containing "/(.*)" should ALWAYS be before the mapper without "/(.*)" because otherwise, imports cannot be resolved correctly.
   */
  moduleNameMapper: {
    '@app/common/(.*)': '<rootDir>/libs/common/src/$1',
    '@app/common': '<rootDir>/libs/common/src',
    '@app/ddd/(.*)': '<rootDir>/libs/ddd/src/$1',
    '@app/ddd': '<rootDir>/libs/ddd/src',
    '@app/openapi-decorators/(.*)': '<rootDir>/libs/openapi-decorators/src/$1',
    '@app/openapi-decorators': '<rootDir>/libs/openapi-decorators/src',
    '@app/testing/(.*)': '<rootDir>/libs/testing/src/$1',
    '@app/testing': '<rootDir>/libs/testing/src',
  },
};
