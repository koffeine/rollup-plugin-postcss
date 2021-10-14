import postcss from 'postcss';

export default (id, code, sourcemap, plugins) =>
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
