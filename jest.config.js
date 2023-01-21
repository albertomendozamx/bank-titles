/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ["build"],
  moduleNameMapper: {
    "@exmpl/(.*)": "<rootDir>/src/$1"
  },
};