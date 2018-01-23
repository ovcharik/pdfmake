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

var docDefinition = {
	content: [
		'First paragraph',
		'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines'
	]
};

var now = new Date();
var pdfDoc = pdfMake.createPdf(docDefinition);
pdfDoc.getBuffer((buffer) => fs.writeFileSync('pdfs/basics.pdf', buffer));
console.log(new Date() - now);
