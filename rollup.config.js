import commonjs from "rollup-plugin-commonjs"
import resolve from "rollup-plugin-node-resolve"
import butternut from "rollup-plugin-butternut"

export default {
    input: "src/index.mjs",
    output: {
        sourcemap: true,
        file: "_build/index.min.js",
        format: "iife"
    },
    name: "aframe_test",
    globals: {
        aframe: 'AFRAME'
    },
    plugins: [
        resolve({
            jsnext: true,
            main: true,
            browser: true}),
        commonjs(),
        butternut()
    ]
}
