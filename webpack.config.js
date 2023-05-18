const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const HtmlWebpackHarddiskPlugin = require("html-webpack-harddisk-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const devMode = process.env.NODE_ENV !== "production";
// const ESLintPlugin = require("eslint-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const enabledSourceMap = process.env.NODE_ENV !== "production";

module.exports = {
  mode: "development",
  entry: {
    main: "./src/index.tsx",
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "js/[name]-[contenthash].js",
    publicPath: "/",
  },
  target: "web",
  resolve: {
    extensions: ["", ".ts", ".js", ".tsx", ".jsx"],
  },
  devServer: {
    static: path.resolve(__dirname, "dist/"),
    hot: true,
    open: true,
    historyApiFallback: true,
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(css|scss|sass)$/,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { sourceMap: true },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [require("autoprefixer")({ grid: true })],
              },
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: enabledSourceMap,
            },
          },
        ],
      },
      {
        test: /\.(js|jsx|tsx)/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              // presets: ["@babel/preset-env", "@babel/preset-react"],
              presets: [
                "@babel/preset-env",
                [
                  "@babel/preset-react",
                  {
                    runtime: "automatic",
                  },
                ],
              ],
            },
          },
        ],
      },
      {
        test: /\.(ts|tsx)/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|svg)$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[name]-[contenthash][ext]",
        },
        use: [
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // new ESLintPlugin({
    //   extensions: [".js"],
    //   exclude: "node_modules",
    // }),
    new MiniCssExtractPlugin({
      filename: "./[name]-[contenthash].css",
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      alwaysWriteToDisk: true,
    }),
    // new HtmlWebpackHarddiskPlugin(),
    new CleanWebpackPlugin(),
  ],
};
