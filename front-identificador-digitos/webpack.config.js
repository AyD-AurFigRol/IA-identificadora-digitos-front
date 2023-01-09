const path = require("path");
const HtmlWPP = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin/');
const webpack = require('webpack');

module.exports = (env) => {
    console.log(env);
    return {
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    resolve: {
                        extensions: [".js", ".jsx"]
                    },
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['@babel/preset-env', {targets: "defaults"}],
                                ['@babel/preset-react', {targets: "defaults"}],

                            ]
                        }
                    }
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
        entry: "./src/index.js",
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
                '/api': {
                    target: 'http://localhost:3000',
                    router: () => 'http://localhost:8080',
                    secure: false
                }
            }
        },
        plugins: [
            new HtmlWPP({
                template: path.resolve(__dirname, "public", "index.html"),
                publicPath: env.REACT_ENV === 'prod' ? '/api/' : '/'
            }),
            new ReactRefreshWebpackPlugin(),
            new webpack.ProvidePlugin({
                process: 'process/browser',
            }),
        ],
        resolve: {
            extensions: ['.´jsx', '.js', '.cjs']
        }
    }
}