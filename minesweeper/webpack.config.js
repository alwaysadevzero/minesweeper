const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");


module.exports = {
    //ничает сборку отсюда
    entry: './src/index.js', 
    output: { //собранные файлы ложит сюда
      path: path.resolve(__dirname, 'dist'),
      filename: 'index.js', 
      assetModuleFilename: 'assets/[hash][ext]',
    },

    mode: 'development',
    devServer: { //также можно указать dev server из модуля webpack-dev-server
      compress: true,
      open: true,
      hot: true,
      port: 3000,
    },

    module: { // 
        rules: [
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                    {
                        loader: "sass-resources-loader",
                        options: {
                            resources: [
                                './src/styles/style.scss',
                            ]
                        }
                    }
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        }),
        new ESLintPlugin(),
        // new CopyPlugin({
        //     patterns: [
        //       { from: "source", to: "dest" },
        //       { from: "other", to: "public" },
        //     ],
        //   }),
    ],
    
};
