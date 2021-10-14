import postcss from 'postcss';

import type { AcceptedPlugin } from 'postcss';
import type { SourceMap } from 'rollup';
import type { RawSourceMap } from 'source-map';

export default (id: string, code: string, sourcemap: SourceMap | boolean, plugins: AcceptedPlugin[]): Promise<{ code: string, map?: RawSourceMap }> =>
	postcss(plugins)
		.process(
			code,
			{
				from: id,
				to: id,
				map: sourcemap ? { prev: sourcemap } : false
			}
		)
		.then(({ css, map }) => ({
			code: css,
			map: map && map.toJSON()
		}));
