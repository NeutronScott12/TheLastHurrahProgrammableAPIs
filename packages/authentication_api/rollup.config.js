import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'

// this override is needed because Module format cjs does not support top-level await
// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require('./package.json')

const globals = {
    ...packageJson.devDependencies,
}

export default {
    input: 'src/index.ts',
    output: [
        {
            file: packageJson.main,
            format: 'cjs', // commonJS
            sourcemap: true,
        },
        {
            file: packageJson.module,
            format: 'esm', // ES Modules
            sourcemap: true,
        },
    ],
    plugins: [
        peerDepsExternal(),
        resolve(),
        commonjs(),
        typescript({
            tsconfig: './tsconfig.json',
            // tsconfigOverride: {
            //     exclude: ['**/*.stories.*'],
            // },
        }),
        commonjs({
            exclude: 'node_modules',
            ignoreGlobal: true,
        }),
    ],
    external: Object.keys(globals),
}

// export default {
//     input: 'src/index.ts',
//     output: {
//         file: `${name}.d.ts`,
//         format: 'cjs',
//         sourcemap: true,
//     },
//     plugins: [
//         json(),
//         typescript({
//             compilerOptions: {
//                 declaration: true,
//             },
//             // tsconfig: './tsconfig.json',
//         }),
//         nodeResolve(),
//         babel({ presets: ['@babel/preset-react'] }),
//         commonJs({ extensions: ['.esm.js', '.mjs', '.js', '.ts'] }),
//     ],
// }
