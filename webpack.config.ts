import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
// import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
// import CompressionPlugin from "compression-webpack-plugin";

// `devServer`를 설정할 때 typescript 오류가 발생하는 경우를 대비하여
import "webpack-dev-server";

const config: webpack.Configuration = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  devtool: "cheap-source-map",
  // performance: {
  //   hints: false,
  //   maxEntrypointSize: 512000,
  //   maxAssetSize: 512000,
  // },
  entry: {
    initPopup: "./src/initPopup/index.tsx",
    popup: "./src/popup/index.tsx",
    background: "./src/background/background.ts",
    content_script: "./src/contents/content-script.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    //chunkFilename: "[id].chunk.js", // 동적 로드된 파일명 지정
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
    allowedHosts: "all", // CORS 에러 해결 content-script.js에서 ws 연결 시 cors 에러발생 없앰
    static: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
    client: {
      webSocketURL: "ws://localhost:9000/ws",
    },
    devMiddleware: {
      writeToDisk: true,
    },
    // historyApiFallback: {
    //   index: "initPopup.html",
    // }, // 열면 localhost:9000번으로도 화면 확인 가능
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
      chunks: ["initPopup"], // 이게 없으면 모든 js파일이 다 로드됨
    }),
    new HtmlWebpackPlugin({
      template: "popup.html",
      filename: "popup.html",
      chunks: ["popup"], // 이게 없으면 모든 js파일이 다 로드됨
    }),
    // new CompressionPlugin({
    //   algorithm: "gzip",
    // }),
    //new BundleAnalyzerPlugin(),
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
    splitChunks: {
      chunks: "all",
    },
  },
};

export default config;
