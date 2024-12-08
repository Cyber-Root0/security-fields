import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
export default {
  input: "SDK/index.js",
  output: {
    file: "dist/SecurityForm.js",
    format: "umd",
    name: "SecurityForm",
  },
  plugins: [resolve(), commonjs(),
    terser({ 
      format: {
        comments: false,
      },
      compress: {
        drop_console: true,
      },
    })
  ],
};