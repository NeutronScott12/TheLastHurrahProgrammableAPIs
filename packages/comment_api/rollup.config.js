import json from '@rollup/plugin-json'
import typescript from '@rollup/plugin-typescript'
import nodeResolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import commonJs from '@rollup/plugin-commonjs'

export default {
    input: 'src/index.ts',
    output: {
        file: 'dist/index.js',
        format: 'cjs',
        sourcemap: true,
    },
    plugins: [
        json(),
        typescript({
            tsconfig: './tsconfig.json',
        }),
        nodeResolve(),
        babel({ presets: ['@babel/preset-react'] }),
        commonJs({ extensions: ['.esm.js', '.mjs', '.js', '.ts'] }),
    ],
}
