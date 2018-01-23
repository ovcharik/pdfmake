var fonts = require.context('.', true, /\.(png|jpg|ttf)$/);

module.exports = fonts.keys().reduce((mem, key) => {
	mem[key] = fonts(key);
	return mem;
}, {});
