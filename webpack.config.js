import path from 'node:path'
import { fileURLToPath } from 'node:url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const isDevelopment = process.env.NODE_ENV !== "production";
const common = {
  mode: isDevelopment ? "development" : "production",
  devtool: isDevelopment ? "source-map" : false,
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        use: [
          {
            loader: 'ts-loader'
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"],
      },
      {
        test: /\.css$/i,
        use: ["css-loader"],
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.css', '.sass', '.scss', '.png', '.jpg', '.jpeg', '.gif'],
    alias: {
      resources: path.resolve(__dirname, 'resources/'),
      src: path.resolve(__dirname, 'src/'),
      node_modules: path.resolve(__dirname, 'node_modules/')
    },
    extensionAlias: {
      '.js': ['.ts', '.js'],
      '.mjs': ['.mts', '.mjs'],
      '.jsx': ['.tsx', '.jsx', '.js', '.ts'],
    }
  },
  watch:  isDevelopment ? true : false,
  watchOptions: {
    ignored: ['/node_modules', '*.d.ts']
  }
}

export default Object.assign({}, common, {
  entry: './src/main.tsx',
  output: {
      filename: 'main.js',
      path: path.resolve(__dirname, isDevelopment ? 'dist':'dist_prod'),
  },
  optimization: {
    usedExports: true,
    sideEffects: true
  }
});