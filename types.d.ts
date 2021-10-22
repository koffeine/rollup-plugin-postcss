import { FilterPattern } from '@rollup/pluginutils';
import { AcceptedPlugin } from 'postcss';
import { Plugin } from 'rollup';

/**
 * Rollup plugin for PostCSS
 */
declare const postcss: (options: {

	/**
	 * Which files should be processed by this plugin
	 *
	 * @default /\.css/u
	 */
	include?: FilterPattern,

	/**
	 * Which files should not be processed by this plugin
	 */
	exclude?: FilterPattern,

	/**
	 * Whether or not to generate and save a sourcemap
	 *
	 * @default false
	 */
	sourcemap: boolean,

	/**
	 * Transformation to apply to each source path in a sourcemap
	 *
	 * @param source Sourcemap source
	 * @param id     Module id (as reported by Rollup)
	 * @returns Transformed path
	 *
	 * @default (source) => path.relative(process.cwd(), source)
	 */
	sourcemapPathTransform: (source: string, id: string) => string,

	/**
	 * Which PostCSS plugins to use
	 *
	 * @default []
	 */
	plugins?: AcceptedPlugin[],

	/**
	 * Where to save the output file which is a Rollup asset relative to output.dir (required)
	 */
	output: string

}) => Plugin;

export = postcss;
