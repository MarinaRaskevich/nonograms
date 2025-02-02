const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, options) => {
  const isProduction = options.mode === "production";

  const config = {
    mode: isProduction ? "production" : "development",
    devtool: "source-map",
    watch: isProduction ? false : true,
    entry: ["./src/index.js", "./src/sass/style.scss"],
    output: {
      path: path.join(__dirname, "/dist"),
      filename: "script.js",
      clean: true,
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
        {
          test: /\.scss$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        },
        {
          test: /\.(png|svg|jpe?g|gif)$/i,
          type: "asset/resource",
        },
        {
          test: /\.(woff|woff2)$/,
          type: "asset/resource",
          generator: {
            filename: "fonts/[name][hash][ext][query]",
          },
        },
        {
          test: /\.html$/,
          loader: "html-loader",
        },
      ],
    },

    plugins: [
      //new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: "index.html",
        filename: "index.html",
      }),
      new MiniCssExtractPlugin({
        filename: "style.css",
      }),
    ],
  };

  return config;
};
