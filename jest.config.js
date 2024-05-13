module.exports = {
  testEnvironment: 'jsdom',
  rootDir: '.',
  coverageDirectory: './coverage',
  setupFiles: ['./jestsetup.js'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  moduleNameMapper: {
    '^@components/(.*)$': '<rootDir>/src/app/components/$1',
    '^@hooks': '<rootDir>/src/app/hooks/',
    '^@services/(.*)$': '<rootDir>/src/app/services/$1',
    '^@styles$': '<rootDir>/src/app/styles/',
    '^@views/(.*)$': '<rootDir>/src/app/views/$1',
    '^@models$': '<rootDir>/src/models/',
    '^@utils$': '<rootDir>/src/utils/',
    '^@testutils$': '<rootDir>/src/testutils/',
    '^app/(.*)$': '<rootDir>/src/app/$1',
  },
  coveragePathIgnorePatterns: [
    'node_modules',
    'src/ssg',
    'src/config.ts',
    'src/app/services/state/store.ts',
    'src/app/styles/global.ts',
    'src/testutils/index.tsx',
  ],
  moduleDirectories: ['node_modules', 'src'],
};
