module.exports = {
    // limit jest to the following patterns/folders
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
    testPathIgnorePatterns: [
        "/node_modules/",
        "/dist/",
        ".html",
        "/tests/custom-db/*",
        "/tests/TestHelpers/*",
        "/tests/TestData/*",
        "/package.json"
    ],

    // coverage options
    collectCoverage: true,
    coverageReporters: process.env.DEV_MODE === "true" ? ["json", "lcov"] : ["json", "lcov", "text"],
    coverageDirectory: "coverage",
    coveragePathIgnorePatterns: ["src/Helpers/FileReaderHelper.ts", "src/Stores/LocalstorageStore.ts"],

    testEnvironment: "node",

    // add typescript support to jest
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    }
};
