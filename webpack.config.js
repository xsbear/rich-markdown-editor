/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
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
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/",
    library: {
      name: "RichMarkdownEditor",
      type: "umd",
    },
  },
  entry: { "rich-markdown-editor": path.resolve(__dirname, "./src/index.tsx") },
  mode: "production",
  plugins: [
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
  externals: {
    react: {
      root: "React",
      commonjs2: "react",
      commonjs: "react",
      amd: "react",
      umd: "react",
    },
    "react-dom": {
      root: "ReactDOM",
      commonjs2: "react-dom",
      commonjs: "react-dom",
      amd: "react-dom",
      umd: "react-dom",
    },
  },
};
