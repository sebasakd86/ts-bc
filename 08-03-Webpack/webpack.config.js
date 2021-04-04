const path = require("path");
const webpack = require("webpack");

module.exports = {
    mode: "development",
    entry: "./src/app.ts",
    output: {
        filename: "bundle.js", //final file name
        path: path.resolve(__dirname, "dist"),
        publicPath: "/dist/",
        clean: true,
    },
    devServer: {
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, "./dist"),
        open: true,
        compress: true,
        hot: true,
        port: 8080,
    },
    plugins: [
        /* ... */
        // Only update what has changed on hot reload
        new webpack.HotModuleReplacementPlugin(),
    ],
    devtool: "inline-source-map",
    //what to do with the files.
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    //which file extensios to add to the bundle
    resolve: {
        extensions: [".ts", ".js"],
    },
};
