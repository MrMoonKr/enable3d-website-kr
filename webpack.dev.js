const path  = require( 'path' ) ;
const fs    = require( 'fs' ).promises ;


const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' ) ;
const HtmlWebpackPlugin = require( 'html-webpack-plugin' ) ;
const CopyWebpackPlugin = require( 'copy-webpack-plugin' ) ;


module.exports = async () => {

    return {
        
        mode: 'development',

        entry: {
            
            'standalone-mode': './src/exercise/js/standalone-mode.js'

        },

        output: {
            
            path: path.join( __dirname, 'dist' ),

            filename: '[name].bundle.js',
        },

        //devtool: 'inline-source-map',
        devtool: 'source-map',

        resolve: {
            extensions: [ '.js', '.ts' ]
        },

        module: {
            rules: [
                // {
                //     test: /\.ts$/,
                //     exclude: /node_modules/,
                //     loader: 'ts-loader',
                //     options: {
                //         compilerOptions: {
                //             module: 'esnext',
                //             declaration: false
                //         }
                //     }
                // },
                {
                    test: /\.(glsl|vert|frag|vs|fs)$/,
                    exclude: /node_modules/,
                    loader: 'webpack-glsl-loader'
                }
            ]
        },

        plugins: [
            
            new CleanWebpackPlugin(),

            new CopyWebpackPlugin( {
                patterns: [
                    {
                        from: 'src',
                        //to: 'standalone-mode.html',
                        // filter: ( source ) => {
                        //     return !source.includes( 'enable3d' )
                        // }
                    }
                ]
            } ),

            new HtmlWebpackPlugin({
                filename: 'standalone-mode' + '.html',
                chunks: [ 'standalone-mode' ],
                template: './src/exercise/standalone-mode.html',

            })
        ]


    }
}