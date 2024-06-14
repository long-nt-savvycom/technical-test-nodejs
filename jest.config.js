/** @type {import('ts-jest').JestConfigWithTsJest} */
// eslint-disable-next-line no-undef
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@user/(.*)$': '<rootDir>/src/modules/user/$1',
    '^@game-item/(.*)$': '<rootDir>/src/modules/game-item/$1',
    '^@auth/(.*)$': '<rootDir>/src/modules/auth/$1',
    '^@database/(.*)$': '<rootDir>/src/database/$1',
    '^@middlewares/(.*)$': '<rootDir>/src/middlewares/$1',
    '^@configs/(.*)$': '<rootDir>/src/configs/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
  },
};