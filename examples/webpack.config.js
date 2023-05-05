/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const { ProgressPlugin } = require("webpack");

module.exports = {
  devtool: "source-map",
  resolve: {
    modules: ["node_modules"],
    extensions: [
      ".ts",
      ".tsx",
      ".js",
      ".jsx",
      ".vue",
      ".less",
      ".css",
      ".json",
    ],
  },
  output: {
    filename: "[name].js",
    chunkFilename: "[name].js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/",
  },
  entry: { app: path.resolve(__dirname, "./index.tsx") },
  devServer: {
    allowedHosts: "all",
    host: "0.0.0.0",
    port: 3000,
    client: {
      overlay: false,
    },
  },
  watchOptions: { aggregateTimeout: 600, ignored: ["**/node_modules"] },
  stats: { preset: "errors-only", timings: true },
  mode: "development",
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./index.html"),
    }),
    new ReactRefreshWebpackPlugin(),
    new ProgressPlugin({
      activeModules: false,
      entries: true,
      modules: true,
      modulesCount: 5000,
      profile: false,
      dependencies: true,
      dependenciesCount: 10000,
      percentBy: null,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(png|jp(e*)g|gif|svg|woff|woff2|eot|ttf)$/,
        type: "asset/resource",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              plugins: ["react-refresh/babel"],
              presets: [
                "@babel/preset-typescript",
                "@babel/preset-env",
                "@babel/preset-react",
              ],
            },
          },
        ],
      },
    ],
  },
};
