module.exports = {
    entry: __dirname + "/src/index.ts",
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    output: {
        path: __dirname + "/dist",
        filename: "main.js",
        libraryTarget: "var",
        libraryExport: "DealerClient",
        library: "Zaidan",
    },
    devServer: {
        contentBase: __dirname + '/dist',
        compress: false,
        port: 8080
    }
};
