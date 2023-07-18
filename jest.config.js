module.exports = {
  testRegex: '.*\\.spec\\.ts$',
  moduleFileExtensions: ['js', 'ts', 'vue'],
  modulePaths: ['<rootDir>/src', '<rootDir>/node_modules'],
  transformIgnorePatterns: ['/node_modules/'],
  transform: {
    '^.+\\.(j|t)sx?$': 'ts-jest',
    '^.+\\.(vue)$': 'vue3-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue'],
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['<rootDir>/src/**/*.{js,ts,vue}'],
  coveragePathIgnorePatterns: ['^.+\\.d\\.ts$', '^.+\\.js$'],
  modulePathIgnorePatterns: ['<rootDir>/.yarn-cache/'],
  cacheDirectory: '<rootDir>/tmp/cache/jest',
  fakeTimers: {
    advanceTimers: true,
    doNotFake: [
      Date,
      // hrtime,
      // nextTick,
      // performance,
      queueMicrotask,
      // requestAnimationFrame,
      // cancelAnimationFrame,
      // requestIdleCallback,
      // cancelIdleCallback,
      setImmediate,
      clearImmediate,
      setInterval,
      clearInterval,
      setTimeout,
      clearTimeout,
    ],
    enableGlobally: true,
    legacyFakeTimers: false,
    now: 1483228800000,
    timerLimit: 1000,
  },
  testEnvironment: 'jsdom',
};