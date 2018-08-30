const path = require("path");

const { removeEmpty } = require("webpack-config-utils");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackCleanupPlugin = require("webpack-cleanup-plugin");
const WebpackAssetsPlugin = require("webpack-assets-manifest");

const APP_DIR = path.resolve(__dirname, "src/client");
const SERVER_DIR = path.resolve(__dirname, "src/server");

const extractPlugin = new MiniCssExtractPlugin({
    filename: "[name].[contenthash].css",
    chunkFilename: "[id].[contenthash].css",
});

const config = {
    name: "portfolio base skeleton",
    entry: {
        main: path.join(APP_DIR, "app.tsx")
    },
    output: {
        filename: "[name].[chunkhash:8].js",
        chunkFilename: "[name].[chunkhash:8].chunk.js",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader"
                ]
            }
        ]
    },
    resolve: {
        extensions:
            [".js", ".jsx", ".ts", ".tsx"]
    },
    plugins: removeEmpty([
        extractPlugin,
        new WebpackCleanupPlugin(),
        new WebpackAssetsPlugin({ output: "assets.json" })
    ])
};

module.exports = [config];