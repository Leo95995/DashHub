import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',         
  // Mi serve per setuppare un ambiente simile al browser     
  testEnvironment: 'jsdom',       
  setupFilesAfterEnv: ['<rootDir>/__tests__/setupTests.ts'], // setup globale RTL e mock
  globals: {
  'ts-jest': {
    tsconfig: 'tsconfig.test.json'
  }
},
  roots: ['<rootDir>/__tests__/components', '<rootDir>/__tests__/pages', '<rootDir>/__tests__/pages'], // test include i miei test. src -> include il mio codice
  moduleNameMapper: {            
    '\\.(css|scss|sass)$': 'identity-obj-proxy',
  },
};

export default config;
