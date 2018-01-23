var fs = require('fs');

var pdfMake = require('../build/pdfmake');

pdfMake.vfs = require('../build/vfs');;
pdfMake.fonts = {
	Roboto: {
		normal     : './fonts/Roboto-Regular.ttf',
		bold       : './fonts/Roboto-Medium.ttf',
		italics    : './fonts/Roboto-Italic.ttf',
		bolditalics: './fonts/Roboto-MediumItalic.ttf'
	}
};

var ct = [];
var lorem = 'Lorem ipsum dolor sit amet';

ct.push({text: 'Higlighted text', fontSize: 18, background: 'yellow'});
ct.push(' ');
ct.push({
	columns: [
		{text: 'Underline decoration', decoration: 'underline'},
		{text: 'Line Through decoration', decoration: 'lineThrough'},
		{text: 'Overline decoration', decoration: 'overline'}
	]
});
ct.push(' ');
ct.push({
	columns: [
		{text: 'Dashed style', decoration: 'underline', decorationStyle: 'dashed'},
		{text: 'Dotted style', decoration: 'underline', decorationStyle: 'dotted'},
		{text: 'Double style', decoration: 'underline', decorationStyle: 'double'},
		{text: 'Wavy style', decoration: 'underline', decorationStyle: 'wavy'}
	]
});
ct.push(' ')
ct.push({
	columns: [
		{text: 'Using colors', decoration: 'underline', decorationColor: 'blue'},
		{text: 'Using colors', decoration: 'lineThrough', decorationColor: 'red'},
		{text: 'Using colors', decoration: 'underline', decorationStyle: 'wavy', decorationColor: 'green'}
	]
});



var docDefinition = {
	content: ct
};

var now = new Date();
var pdfDoc = pdfMake.createPdf(docDefinition);
pdfDoc.getBuffer((buffer) => fs.writeFileSync('pdfs/textDecorations.pdf', buffer));
console.log(new Date() - now);
