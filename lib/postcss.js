'use strict';

const postcss = require('postcss');

module.exports = (id, code, sourcemap, plugins) =>
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
			map
		}));
