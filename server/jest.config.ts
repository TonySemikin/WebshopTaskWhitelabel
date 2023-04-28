export default {
  roots: ['<rootDir>/src'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  testMatch: ['**/__tests__/*.+(ts)'],
  collectCoverageFrom: ['**/*.ts'],
  modulePathIgnorePatterns: [
    './jest.config.ts',
    '/src/_common/init',
    './server.ts',
  ],
  setupFiles: ['./jest.env.ts'],
};
