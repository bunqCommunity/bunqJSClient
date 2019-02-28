module.exports = {
    // limit jest to the following patterns/folders
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
    testPathIgnorePatterns: ["/node_modules/", "/dist/", ".html", "/tests/custom-db/*", "/package.json"],

    // coverage options
    mapCoverage: true,
    collectCoverage: true,
    coverageReporters: process.env.DEV_MODE === "true" ? ["json", "lcov"] : ["json", "lcov", "text"],
    coverageDirectory: "coverage",
    coveragePathIgnorePatterns: ["src/Helpers/FileReaderHelper.ts"],

    // add typescript support to jest
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    }
};
