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

var lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id semper massa, nec dapibus mauris. Mauris in mattis nibh. Aenean feugiat volutpat aliquam. Donec sed tellus feugiat, dignissim lectus id, eleifend tortor. Ut at mauris vel dui euismod accumsan. Cras sodales, ante sit amet varius dapibus, dolor neque finibus justo, vel ornare arcu dolor vitae tellus. Aenean faucibus egestas urna in interdum. Mauris convallis dolor a condimentum sagittis. Suspendisse non laoreet nisl. Curabitur sed pharetra ipsum. Curabitur aliquet purus vitae pharetra tincidunt. Cras aliquam tempor justo sit amet euismod. Praesent risus magna, lobortis eget dictum sit amet, tristique vel enim. Duis aliquet, urna maximus sollicitudin lobortis, mi nunc dignissim ligula, et lacinia magna leo non sem.';

var docDefinition = {
	//watermark: 'test watermark',
	watermark: {text: 'test watermark', color: 'blue', opacity: 0.3, bold: true, italics: false},
	content: [
		'Test page of watermark.\n\n',
		lorem
	]
};

var now = new Date();
var pdfDoc = pdfMake.createPdf(docDefinition);
pdfDoc.getBuffer((buffer) => fs.writeFileSync('pdfs/watermark.pdf', buffer));
console.log(new Date() - now);
