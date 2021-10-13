# rollup-plugin-postcss

[![npm (scoped)](https://img.shields.io/npm/v/@koffeine/rollup-plugin-postcss)](https://www.npmjs.com/package/@koffeine/rollup-plugin-postcss)
[![dependencies Status](https://david-dm.org/koffeine/rollup-plugin-postcss/status.svg)](https://david-dm.org/koffeine/rollup-plugin-postcss)
[![devDependencies Status](https://david-dm.org/koffeine/rollup-plugin-postcss/dev-status.svg)](https://david-dm.org/koffeine/rollup-plugin-postcss?type=dev)
[![peerDependencies Status](https://david-dm.org/koffeine/rollup-plugin-postcss/peer-status.svg)](https://david-dm.org/koffeine/rollup-plugin-postcss?type=peer)

Rollup plugin for PostCSS

## What it does

- Transforms imported CSS files using PostCSS plugins
- Concatenates and extracts processed styles

## Features

- Sourcemap support
	- Only generates and saves sourcemap when requested by the configuration
	- Generates correct sourcemap file that traces back to the original imported file
	- Makes sources relative to cwd by default, but this can be overridden with a custom sourcemapPathTransform function

## Installation

```sh
npm install @koffeine/rollup-plugin-postcss postcss --save-dev
```

## Usage

```js
import postcss from '@koffeine/rollup-plugin-postcss';

export default {
	// ...
	plugins: [
		postcss({
			// which files should be processed by this plugin
			// type: regular expression, minimatch pattern or an array of regular expressions and minimatch patterns
			include: /\.css/u,

			// which files should not be processed by this plugin
			// type: regular expression, minimatch pattern or an array of regular expressions and minimatch patterns
			exclude: undefined,

			// whether or not to generate and save a sourcemap
			// type: boolean
			sourcemap: false,

			// transformation to apply to each source path in a sourcemap
			// type: (source: string, id: string) => string
			//     source: sourcemap source
			//     id: module id (as reported by Rollup)
			//     returns: transformed path
			sourcemapPathTransform: (source) => path.relative(process.cwd(), source),

			// which PostCSS plugins to use
			// type: array of PostCSS plugins
			plugins: [],

			// where to save the output file which is a Rollup asset relative to output.dir (required)
			// type: string
			output: undefined
		})
	]
	// ...
};
```

## License

Copyright © Kornél Horváth

Licensed under the [MIT License](https://raw.githubusercontent.com/koffeine/rollup-plugin-postcss/master/LICENSE).
