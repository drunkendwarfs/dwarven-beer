import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import filesize from "rollup-plugin-filesize";
import typescript from "@rollup/plugin-typescript";

export default {
    // see https://rollupjs.org/guide/en/#big-list-of-options for config details
    input: "src/index.ts",
    external : [],
    output: {
        file: "./assets/js/beer.js",
        // Use "iife" if the bundle is self-contained, or "es" to create a ES6 module
        format: "iife",
        // Name is required for the variable that holds the iife (not needed for "es")
        name : "DwarvenBeer",
        globals : {
        },
        sourcemap : true
    },
    plugins: [
        typescript(),

        nodeResolve({
            browser : true
        }),

        commonjs({
            include : "node_modules/**"
        }),

        filesize()
    ]
};