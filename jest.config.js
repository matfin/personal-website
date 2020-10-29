module.exports = {
  globals: {
    window: true
  },
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
    '^content/(.*)$': '<rootDir>/assets/content/$1',
    '^app/(.*)$': '<rootDir>/src/app/$1',
    '^common/(.*)$': '<rootDir>/src/common/$1',
    '^server/(.*)$': '<rootDir>/src/server/$1',
  },
  coveragePathIgnorePatterns: [
    'node_modules',
    'src/common/config.ts',
    'src/common/store.ts',
    'src/common/utils/testutils.tsx',
    'src/app/views/page/ConnectedPage.tsx',
  ],
  moduleDirectories: ['node_modules', 'src']
};
