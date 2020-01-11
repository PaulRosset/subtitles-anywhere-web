"use strict";
const path = require("path");
const CopyWebPackPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = () => ({
  devtool: "sourcemap",
  entry: {
    background: "./src/background.ts",
    content: "./src/content.ts",
    options: "./src/options.ts",
  },
  output: {
    path: path.join(__dirname, "build"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "ts-loader",
      },
    ],
  },
  optimization: {
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    new CopyWebPackPlugin([
      {
        from: "*",
        context: "src",
        ignore: ["*.js", "*.ts", "*.tsx"],
      },
    ]),
  ],
});
