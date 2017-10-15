module.exports = [
    {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        include: /(src)/,
        use: "babel-loader"
    },
    {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        include: /(src)/,
        use: "ts-loader"
    }
];
