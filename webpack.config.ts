import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";

// `devServer`를 설정할 때 typescript 오류가 발생하는 경우를 대비하여
import "webpack-dev-server";

const config: webpack.Configuration = {
  devtool: "cheap-source-map",
  entry: {
    initPopup: "./src/initPopup/index.tsx",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    clean: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  devServer: {
    static: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
    client: {
      webSocketURL: "ws://localhost:9000/ws",
    },
    devMiddleware: {
      writeToDisk: true,
    },
    historyApiFallback: {
      index: "initPopup.html",
    },
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "manifest.json", to: "." },
        { from: "public", to: "." },
      ],
    }),
    new HtmlWebpackPlugin({
      template: "initPopup.html",
      filename: "initPopup.html",
      chunks: ["initPopup"],
    }),
  ],
  // optimization: {
  //   minimize: true,
  //   minimizer: [new TerserPlugin()],
  // },
};

export default config;
