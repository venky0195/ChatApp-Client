var path = require("path");

var DIST_DIR = path.resolve(__dirname, "dist");
var SCR_DIR = path.resolve(__dirname, "src");

var config = {
    entry: SCR_DIR + "./src/index.js",
    output: {
        path: DIST_DIR + "./dist",
        filename: 'app.bundle.js',
        publicPath: "./src"
    }, 
    module : {
        loaders: [{
            test: /\.js?/,
            include: SCR_DIR,
            loader: "babel-loader",
            query: {
                presets: ["react", "es2015"]
            }
        }]
    }
};

module.exports = config;