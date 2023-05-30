const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode:"none",
  entry: {
    //sirve para indicar el archivo de Javascript de entrada de este proyecto.
    app: ["@babel/polyfill", "./src/app/index.js"]
  },
  output: {
    //En este archivo estamos configurando  el directorio de salida de los paquetes (bundles) generados.
    path: path.resolve(__dirname, "build"),
    //filename: Sirve para decirle el nombre del archivo del bundle que va a generar.
    filename: "js/app.bundle.js",
  },
  devServer: {
    port: 5050
},
module: {
    //sirve para aclararle a Webpack cómo debe procesar los loaders que queramos usar para un proyecto.
    rules: [
        {
            test: /\.js$/i,
            loader: 'babel-loader'
        },
        {
            test: /\.scss$/i,
            use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        },
        {
            test:/\.(png|svg|jpg|jpeg)$/i,
            type: 'asset/resource'
        },
        {
            test: /\.html$/,
            use:[
                'html-loader'
            ]
        },
    ],
},
plugins: [
    //sirve para definir los plugins que vamos a usar, que permiten ampliar la cantidad y el tipo 
    //de tareas que Webpack puede realizar por sí mismo. Generalmente las transformaciones de los 
    //loaders se basan en algún plugin, aunque no siempre es así. En la propiedad plugins tenemos que
    // instanciar los objetos de cada plugin que queremos usar y que nos den soporte a aquellas 
    //transformaciones o tareas deseadas.
    new HTMLWebpackPlugin({
        hash: true,
        filename: 'index.html',
        template: './src/index.html',
        minify: {
            collapseWhitespace:true,
            removeComments: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            useShortDoctype: true
        },
    }),
    new MiniCssExtractPlugin({
        filename: "css/app.bundle.css",
    }),
]
}