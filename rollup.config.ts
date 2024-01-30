import resolve from "@rollup/plugin-node-resolve";
import path from "path";
import dts from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";
import externals from "rollup-plugin-node-externals";
import pkg from "./package.json" assert { type: "json" };

export default [
  {
    input: "src/index.ts",
    plugins: [
      externals({ deps: true, packagePath: "./package.json" }),
      resolve(),
      esbuild(),
    ],
    output: [
      {
        format: "cjs",
        sourcemap: true,
        dir: path.dirname(pkg.publishConfig.main),
      },
      {
        format: "esm",
        sourcemap: true,
        dir: path.dirname(pkg.publishConfig.module),
        preserveModules: true,
        // preserveModulesRoot: path.join(
        //   // @ts-expect-error (TS cannot assure that `process.env.PROJECT_CWD` is a string)
        //   process.env.PROJECT_CWD,
        //   `icons/src`,
        // ),
      },
    ],
  },
  {
    input: "./compiled/index.d.ts",
    plugins: [dts()],
    output: {
      file: pkg.publishConfig.types,
      format: "es",
    },
  },
];
