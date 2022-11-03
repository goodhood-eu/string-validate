import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default [
  {
    input: ['src/index.js'],
    output: [
      {
        file: 'lib/index.js',
        format: 'es'
      },
      {
        file: 'lib/index.cjs',
        format: 'cjs',
        exports: 'named',
      },
    ],
    plugins: [
      commonjs(),
      babel({ babelHelpers: 'runtime' }),
      nodeResolve(),
    ],
  },
];
