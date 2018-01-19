var fonts = {
	Roboto: {
		normal: 'fonts/Roboto-Regular.ttf',
		bold: 'fonts/Roboto-Medium.ttf',
		italics: 'fonts/Roboto-Italic.ttf',
		bolditalics: 'fonts/Roboto-MediumItalic.ttf'
	}
};

var PdfPrinter = require('../src/printer');
var printer = new PdfPrinter(fonts);
var fs = require('fs');

var docDefinition = {
	pageSize: 'A4',
	pageOrientation: 'portrait',
	pageMargins: [ 48, 128, 48, 48 ],

	header: [
		{
			image: 'selectel-logo',
			fit: [ 135, 28 ],
			// margin: [ 48, 48, 0, 0 ],
			absolutePosition: { x: 48, y: 48 }
		},
		{
			fontSize: 12,
			lineHeight: 1.2,
			alignment: 'right',
			margin: [ 0, 38, 48, 0 ],
			stack: [
				'Россия, Санкт-Петербург, ул. Цветочная, 21а',
				'+7 (800) 555-06-75',
				{ text: 'sales@selectel.ru', bold: true },
			],
		},
		{
			absolutePosition: { x: 0, y: 126 },
			canvas: [
				{
					type: 'line',
					x1: 0  , y1: 0,
					x2: 600, y2: 0,
					lineWidth: 4,
					lineColor: '#b42220',
				}
			]
		}
	],

	content: {},

	footer: {},

	images: {
		'selectel-logo': 'fonts/logo-selectel.png',
	},

	styles: {
	},

	defaultStyle: {},
};

var pdfDoc = printer.createPdfKitDocument(docDefinition);
pdfDoc.pipe(fs.createWriteStream('pdfs/selectel.pdf'));
pdfDoc.end();
