const { ModuleFederationPlugin } = require("webpack").container;
const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");

module.exports = {
  entry: "./src/index",
  cache: false,

  mode: "development",
  devtool: "source-map",

  optimization: {
    minimize: false,
  },

  output: {
    publicPath: "http://localhost:8080/",
    libraryTarget: "system",
  },

  resolve: {
    extensions: [".jsx", ".js", ".json", ".tsx", ".ts"],
  },
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: require.resolve("babel-loader"),
        options: {
          presets: [["@babel/preset-react", { runtime: "automatic" }]],
        },
      },
    ],
  },

  // modify the webpack config however you'd like to by adding to this object
  plugins: [
    new ModuleFederationPlugin({
      name: "app1",
      shared: ["react^18.2.0", "react-dom/client"],
      filename: "remoteEntry.js",
      remotes: {
        "root-config": "root-config",
      },
      exposes: {
        "./Root": "./src/root.component.tsx",
      },
      library: { type: "system" },
    }),
  ],
};
