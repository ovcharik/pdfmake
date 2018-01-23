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
	pageSize: 'A4',
	pageOrientation: 'portrait',
	pageMargins: [ 48, 48, 48, 48 ],

	content: [
		// HEADER
		{
			columns: [
				{
					margin: [0, 10, 0, 0],
					image: 'selectel-logo',
					fit: [ 135, 28 ],
				},
				{
					width: 'auto',
					fontSize: 12,
					lineHeight: 1.2,
					alignment: 'right',
					stack: [
						'Россия, Санкт-Петербург, ул. Цветочная, 21а',
						'+7 (800) 555-06-75',
						{ text: 'sales@selectel.ru', bold: true },
					],
				},
			]
		},
		{
			margin: [0, 40, 0, 0],
			canvas: [
				{
					type: 'line',
					x1: -48, y1: 0,
					x2: 600, y2: 0,
					lineWidth: 4,
					lineColor: '#b42220',
				}
			]
		},

		// TITLE
		{
			margin: [0, 30, 0, 0],

			text: 'Ваш заказ',
			fontSize: 24,
			lineHeight: 1,
		},

		// RECORDS
		{
			margin: [0, 20, 0, 0],

			headerRows: 1,
			table: {
				widths: ['auto', 'auto', 'auto', '*', 'auto'],

				body: [
					[{ text: ' ', colSpan: 5, fontSize: 9 },'','','',''],
					[{ text: 'Сервер 1', colSpan: 5, margin: [5, 0, 5, 7], fontSize: 16 }, '', '', '', ''],

					[{ text: 'Intel Xeon E3-1230 3.4 ГГц, 32 ГБ DDR4, 2 × 240 ГБ SSD', colSpan: 4, margin: [5, 3, 0, 0] }, '', '', '', { text: '6 500 ₽' , margin: [0, 3, 5, 0], alignment: 'right' }],
					[{ text: 'Полоса 100 Мбит/сек, безлимитный трафик'               , colSpan: 4, margin: [5, 3, 0, 0] }, '', '', '', { text: '0 ₽'     , margin: [0, 3, 5, 0], alignment: 'right' }],
					[{ text: 'Дополнительная гарантированная полоса 1 Гбит/с'        , colSpan: 4, margin: [5, 3, 0, 0] }, '', '', '', { text: '35 000 ₽', margin: [0, 3, 5, 0], alignment: 'right' }],
					[{ text: 'Локальный порт 1 Гбит/с'                               , colSpan: 4, margin: [5, 3, 0, 0] }, '', '', '', { text: '250 ₽'   , margin: [0, 3, 5, 0], alignment: 'right' }],
					[{ text: ' ', colSpan: 5, fontSize: 9 },'','','',''],

					[
						{ stack: [ { text: 'Локация'   , fontSize: 10 }, { text: 'SPB-3'  , bold: true } ], margin: [5, 5, 0, 5] },
						{ stack: [ { text: 'Период'    , fontSize: 10 }, { text: '1 месяц', bold: true } ], margin: [5, 5, 0, 5] },
						{ stack: [ { text: 'Количество', fontSize: 10 }, { text: '2'      , bold: true } ], margin: [5, 5, 0, 5] },
						{ stack: [ { text: 'Скидка'    , fontSize: 10 }, { text: '5%'     , bold: true } ], margin: [5, 5, 0, 5] },

						{ text: '79 325 ₽', margin: [0, 12, 5, 5], bold: true, alignment: 'right' }
					]
				],
			},

			layout: {
				hLineWidth: (i, node) => (i === 0 || i >= node.table.body.length - 1) ? 1 : 0,
				vLineWidth: (i, node) => (i === 0 || i === node.table.widths.length ) ? 1 : 0,
			},
		},

		// TOTAL
		{
			margin: [0, 20, 5, 0],

			columns: [
				{ width: '*', text: '' },
				{
					width: 'auto',
					stack: [
						{
							columns: [
								{
									stack: [
										{ text: 'Итого к оплате', fontSize: 16, bold: true },
										{ text: 'В т. ч. НДС 18%', margin: [0, 3, 0, 0] },
									],
								},
								{
									width: 'auto',
									stack: [
										{ text: '1 915 981,50 ₽', fontSize: 16, bold: true, margin: [0, 0, 6, 0] },
										{ text: '344 876,67 ₽', margin: [0, 3, 6, 0] },
									],
								},
							]
						},
						{ text: 'Обратите внимание данное предложение не является офертой', fontSize: 10, margin: [0, 10, 6, 0] }
					]
				}
			]
		}
	],

	footer: [
		{
			canvas: [
				{
					type: 'line',
					x1: 0  , y1: 24,
					x2: 600, y2: 24,
					lineWidth: 40,
					lineColor: '#ffffff',
				}
			]
		}
	],

	pageBreakBefore: (currentNode) => {
		if (
			currentNode.pageNumbers.length > 1 && (
				currentNode.hasOwnProperty('table') ||
				currentNode.hasOwnProperty('columns')
			)
		) {
			return true;
		}
	},

	images: {
		'selectel-logo': pdfMake.vfs['./images/selectel-logo.png'],
	},
};

var now = new Date();
var pdfDoc = pdfMake.createPdf(docDefinition);
pdfDoc.getBuffer((buffer) => fs.writeFileSync('pdfs/selectel.pdf', buffer));
console.log(new Date() - now);
