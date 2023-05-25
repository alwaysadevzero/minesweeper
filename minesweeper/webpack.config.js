const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    //ничает сборку отсюда
    entry: './src/pages/minesweeper/app-minesweeper.js', 
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
                test: /\.(?:ico|gif|png|jpg|jpeg|mp3|wav)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.svg$/,
                use: 'svg-inline-loader'
            },
              
            // {
            //     test: /\.(sa|sc|c)ss$/i,
            //     use: [
            //       MiniCssExtractPlugin.loader, // instead of 'style-loader'
            //       'css-loader',
            //       'sass-loader',
            //       {
            //         loader: 'sass-resources-loader',
            //         options: {
            //           resources: ['./src/styles/style.scss'],
            //         },
            //       },
            //     ],
            //   },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/pages/minesweeper/minesweeper.html",
            filename: "./index.html"
        }),
        new ESLintPlugin({fix: true}),
        new CopyPlugin({
            patterns: [
              { from: 'src/assets/audio', to: 'assets/audio' },
            ],
          }),
        // new MiniCssExtractPlugin({
        //     filename: '[name].css',
        //     chunkFilename: '[id].css',
        //   }),
        // new CopyPlugin({
        //     patterns: [
        //       { from: "./src/assets", to: "./dist" },
        //     //   { from: "other", to: "public" },
        //     ],
        //   }),
    ],
    
};
