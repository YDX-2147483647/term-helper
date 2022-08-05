import typescript from 'rollup-plugin-typescript2'
import sass from 'rollup-plugin-sass'
import postcss from 'rollup-plugin-postcss'

export default [
  {
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
  },
  {
    input: 'src/example.scss',
    output: {
      file: 'dist/example.css',
      format: 'module'
    },
    plugins: [
      postcss({
        extract: true
      }),
      sass()
    ]
  }
]
