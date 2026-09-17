import { createHash } from 'node:crypto';
import { DefinePlugin, HtmlRspackPlugin, rspack, type Configuration } from '@rspack/core';
import { ReactRefreshRspackPlugin } from '@rspack/plugin-react-refresh';
import { CEnvironment } from './environment.config';

/**
 * - `root`        → `${layer}-${component}-${hash}` (classname dropped)
 * - `root_variant`→ `${layer}-${component}_variant-${hash}`
 * - any other    → `${layer}-${component}__${classname}-${hash}`
 *
 * `layer` is the layer directory after `src/N_` (e.g. `app`, `modules`);
 * `component` is the file basename without extension.
 */
const generateScopedName = (filename: string, classname: string): string => {
  const hash = createHash('sha256')
    .update(filename + classname)
    .digest('hex')
    .slice(0, 5);

  const layer = filename.split(/src\/\d_/)[1]?.split('/')[0] ?? '';
  const component = filename.split('/').pop()?.split('.').shift() ?? '';

  if (classname.startsWith('root')) {
    const hasUnderscore = classname[4] === '_';

    if (hasUnderscore) {
      return `${layer}-${component}${classname.replace('root', '')}-${hash}`;
    }

    return `${layer}-${component}-${hash}`;
  }

  return `${layer}-${component}__${classname}-${hash}`;
};

const cssModulesLoader = {
  loader: 'css-loader',
  options: {
    modules: {
      localIdentName: '[local]',
      getLocalIdent: (
        loaderContext: { resourcePath: string },
        _localIdentName: string,
        localName: string,
      ): string => generateScopedName(loaderContext.resourcePath, localName),
      exportLocalsConvention: 'dashesOnly',
      namedExport: false,
    },
  },
};

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
            type: 'javascript/auto',
            use: [
              CEnvironment.IS_DEVELOPMENT
                ? 'style-loader'
                : rspack.CssExtractRspackPlugin.loader,
              cssModulesLoader,
            ],
          },
          {
            test: /\.global\.css$/i,
            type: 'css/global',
          },
          {
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
    !CEnvironment.IS_DEVELOPMENT && new rspack.CssExtractRspackPlugin(),
  ],
  devServer: {
    port: CEnvironment.PORT,
    open: !CEnvironment.IS_E2E,
    hot: true,
    historyApiFallback: true,
  },
} satisfies Configuration;
