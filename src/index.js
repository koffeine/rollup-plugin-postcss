import path from 'path';

import { createFilter } from '@rollup/pluginutils';

import postcss from './postcss.js';
import concat from './concat.js';

export default ({
	include = /\.css/u,
	exclude,
	sourcemap = false,
	sourcemapPathTransform = (source) => path.relative(process.cwd(), source),
	plugins = [],
	output
}) => {

	const filter = createFilter(include, exclude);

	const styles = {};

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
