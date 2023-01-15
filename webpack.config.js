const path = require("path");
const HtmlWPP = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin/');
const webpack = require('webpack');
const { DotenvCmdWebpack } = require('dotenv-cmd-webpack');

module.exports = (env) => {
    console.log(env);
    return {
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    exclude: /node_modules/,
                    use: 'ts-loader'
                },
                {
                    test: /\.css$/,
                    use: ["style-loader", "css-loader", "postcss-loader"]
                }, 
                {
                    test: /\.(png|jpg|jpeg|gif)$/i,
                    type: "asset/resource",
                }
            ]
        },
        entry: "./src/index.tsx",
        output: {
            publicPath: "/",
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'build'),
        },
        devServer: {
            port: 3000,
            historyApiFallback: true,
            hot: true,
            open: true,
            proxy: {
                '/skynet': {
                    target: 'http://localhost:3000',
                    router: () => 'http://localhost:8080',
                    secure: false
                }
            }
        },
        plugins: [
            new HtmlWPP({
                template: path.resolve(__dirname, "public", "index.html"),
                publicPath: env.REACT_ENV === 'prod' ? '/skynet/' : '/'
            }),
            new ReactRefreshWebpackPlugin(),
            new webpack.ProvidePlugin({
                process: 'process/browser',
            }),
            new DotenvCmdWebpack({
                filePath: './.env.json',
                env: env.REACT_ENV,
            }),
        ],
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.cjs']
        }
    }
}