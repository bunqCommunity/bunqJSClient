module.exports = {
    // coverage options
    collectCoverage: true,
    mapCoverage: true,
    coverageReporters:
        process.env.DEV_MODE === "true"
            ? ["json", "lcov"]
            : ["json", "lcov", "text"],
    coverageDirectory: "coverage",
    // add typescript support to jest
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    // limit jest to the following patterns/folders
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
    testPathIgnorePatterns: [
        "/node_modules/",
        "/dist/",
        ".html",
        "/tests/custom-db/*",
        "/package.json"
    ]

    // disabled until more tests are added and the threshold is close
    // coverageThreshold: {
    //     global: {
    //         branches: 80,
    //         functions: 80,
    //         lines: 80,
    //         statements: -10
    //     }
    // }
};
