export default {
  collectCoverage: true,
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^(.+\\.svg)$": "<rootDir>/src/tests/__mocks__/svgMock.tsx",
  },
};
