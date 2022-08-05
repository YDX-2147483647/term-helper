import typescript from 'rollup-plugin-typescript2'

export default {
  input: 'src/index.ts',
  output: [
    {
      name: 'TermHelper',
      file: 'dist/index.js',
      format: 'umd'
    },
    {
      name: 'TermHelper',
      file: 'dist/index.mjs',
      format: 'module'
    }
  ],
  plugins: [
    typescript()
  ]
}
