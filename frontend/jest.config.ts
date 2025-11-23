import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/__tests__/setupTests.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: 'tsconfig.test.json' }]
  },
  roots: ['<rootDir>/__tests__/components', '<rootDir>/__tests__/utils', '<rootDir>/__tests__/pages', '<rootDir>/__tests__/smoke'],
  moduleNameMapper: {
    '\\.(css|scss|sass)$': 'identity-obj-proxy',
      '\\.(png|jpg|jpeg|gif|svg)$': '<rootDir>/__mocks__/fileMock.js' // trasforma tutti i file di quel tipo in stringhe
  },
};

export default config;
