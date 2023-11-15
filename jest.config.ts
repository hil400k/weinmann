export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    "^.+\\.tsx?$": "ts-jest"
    // process `*.tsx` files with `ts-jest`
  },
  moduleNameMapper: {
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/src/test-mocks/fileMock.ts',
    '\\.(css|scss)$': '<rootDir>/src/test-mocks/styleMock.ts'
  },
}
