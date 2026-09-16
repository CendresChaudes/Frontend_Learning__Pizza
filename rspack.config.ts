import { DefinePlugin, HtmlRspackPlugin, type Configuration } from '@rspack/core';
import { ReactRefreshRspackPlugin } from '@rspack/plugin-react-refresh';
import { CEnvironment } from './environment.config';

export default {
  mode: CEnvironment.IS_DEVELOPMENT ? 'development' : 'production',
  entry: './src/1_app/index.tsx',
  output: {
    path: new URL('./dist', import.meta.url).pathname,
    publicPath: '/',
    clean: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
    tsConfig: {
      configFile: new URL('./tsconfig.app.json', import.meta.url).pathname,
    },
  },
  module: {
    parser: {
      'css/module': {
        namedExports: false,
      },
      'css/global': {
        namedExports: false,
      },
    },
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'builtin:swc-loader',
            options: {
              jsc: {
                parser: { syntax: 'typescript', tsx: true },
                transform: {
                  react: {
                    runtime: 'automatic',
                    development: !CEnvironment.IS_PRODUCTION,
                    refresh: !CEnvironment.IS_PRODUCTION,
                  },
                },
              },
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        oneOf: [
          {
            test: /\.module\.css$/i,
            use: ['postcss-loader'],
            type: 'css/module',
          },
          {
            test: /\.global\.css$/i,
            use: ['postcss-loader'],
            type: 'css/global',
          },
          {
            use: ['postcss-loader'],
            type: 'css',
          },
        ],
      },
      {
        test: /\.svg$/i,
        issuer: /\.tsx$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgoConfig: {
                plugins: [
                  {
                    name: 'preset-default',
                    params: { overrides: { removeViewBox: false } },
                  },
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|webp|ico)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new DefinePlugin({
      'import.meta.env.IS_MOCKING_ACTIVE': CEnvironment.IS_MOCKING_ACTIVE,
    }),
    new HtmlRspackPlugin({
      template: './public/index.html',
    }),
    CEnvironment.IS_DEVELOPMENT && new ReactRefreshRspackPlugin(),
  ],
  devServer: {
    port: CEnvironment.PORT,
    open: !CEnvironment.IS_E2E,
    hot: true,
    historyApiFallback: true,
  },
} satisfies Configuration;
