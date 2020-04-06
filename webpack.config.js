const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = (env = {}, argv = {}) => ({
    devtool: "source-map",
    devServer: {
        contentBase: path.resolve(__dirname, "./src"),
        watchContentBase: true,
        hot: true,
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader", options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "sass-loader", options: {
                            sourceMap: true
                        }
                    }
                ]
            }, {
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader", options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(jpe?g|gif|jpg|png|svg)$/,
                use: [
                    "file-loader",
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            disable: argv.mode === "development" ? true : false
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        argv.mode === "development" ?
            new HtmlWebpackPlugin({
                template: './src/index.html',
                filename: 'index.html',
            }) : null
    ].filter(
        plugin => !!plugin
    )
})