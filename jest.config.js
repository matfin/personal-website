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
      statements: 100
    }
  },
  moduleNameMapper: {
    '^app/(.*)$': '<rootDir>/src/app/$1',
    '^models/(.*)$': '<rootDir>/src/models/$1',
    '^utils/(.*)$': '<rootDir>/src/utils/$1',
  },
  coveragePathIgnorePatterns: [
    'node_modules',
    'src/ssg',
    'src/config.ts',
    'src/store.ts',
    'src/utils/testutils.tsx',
    'src/app/views/page/ConnectedPage.tsx',
  ],
  moduleDirectories: ['node_modules', 'src']
};
