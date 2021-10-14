import path from 'path';

import { createFilter } from '@rollup/pluginutils';

import postcss from './postcss';
import concat from './concat';

import type { Plugin } from 'rollup';
import type { RawSourceMap } from 'source-map';
import type { AcceptedPlugin } from 'postcss';
import type { FilterPattern } from '@rollup/pluginutils';

export default ({
	include = /\.css/u,
	exclude,
	sourcemap = false,
	sourcemapPathTransform = (source) => path.relative(process.cwd(), source),
	plugins = [],
	output
}: {
	include?: FilterPattern,
	exclude?: FilterPattern,
	sourcemap: boolean,
	sourcemapPathTransform: (source: string, id: string) => string,
	plugins?: AcceptedPlugin[],
	output: string
}): Plugin => {

	const filter = createFilter(include, exclude);

	const styles: { [id: string]: { code: string, map?: RawSourceMap } } = {};

	return {
		name: 'postcss',

		transform(code, id) {
			if (!filter(id)) {
				return;
			}


			return postcss(id, code, sourcemap ? this.getCombinedSourcemap() : false, plugins) // eslint-disable-line consistent-return
				.then((result) => {
					if (result.map) {
						result.map.sources = result.map.sources.map((source) => sourcemapPathTransform(source, id));
					}

					styles[id] = result;

					return '';
				});
		},

		generateBundle() {
			const ids = Array.from(this.getModuleIds()).filter((id) => id in styles);

			if (ids.length === 0) {
				return;
			}


			const outputBasename = path.basename(output);

			const { code, map } = concat(sourcemap, outputBasename, ids.map((id) => ({ id, ...styles[id] })));

			if (map) {
				this.emitFile({
					type: 'asset',
					fileName: output,
					source: `${code}\n/*# sourceMappingURL=${outputBasename}.map */`
				});
				this.emitFile({
					type: 'asset',
					fileName: `${output}.map`,
					source: map
				});
			} else {
				this.emitFile({
					type: 'asset',
					fileName: output,
					source: code
				});
			}
		}
	};
};
