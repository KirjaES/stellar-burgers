/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';

const config: Config = {
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {}]
  },
  clearMocks: true,
  coverageProvider: 'v8',
  moduleNameMapper: {
    '^@api$': '<rootDir>/src/utils/burger-api.ts'
  },
  testEnvironment: 'jsdom',
  testMatch: ['**/__tests__/**/*.[jt]s?(x)']
};

export default config;
