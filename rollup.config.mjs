import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

export default [
  {
    input: ['src/index.ts'],
    output: [
      {
        file: 'lib/index.ts',
        format: 'es'
      },
      {
        file: 'lib/index.cjs',
        format: 'cjs',
        exports: 'named',
      },
    ],
    plugins: [
      nodeResolve(),
      babel({ babelHelpers: 'runtime' }),
      typescript(),
      commonjs({ extensions: ['.js', '.ts'] }),
    ],
  },
];
