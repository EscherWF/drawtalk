const path = require('path')
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack')
const pkg = require('./package.json');

module.exports = {
    assetsDir: 'assets',
    pages: {
        index: {
            entry: 'src/scripts/app.js',
            template: 'src/public/index.html',
            title: ""
        }
    },
    configureWebpack: {
        plugins: [
            new CopyPlugin(
                [
                    {
                        from: path.join(__dirname, 'src/public'),
                        to: path.join(__dirname, 'public'),
                        toType: "dir",
                        ignore: [
                            {
                            glob: 'index.html',
                            matchBase: false
                            }
                        ]
                    }
                ]
            ),
            new webpack.DefinePlugin({
                'process.env.VERSION': JSON.stringify(pkg.version)
            }),
            new Dotenv(),
        ]
    },
}