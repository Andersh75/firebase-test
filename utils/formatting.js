//set style to: currency, decimal or percent
var formatOptionsDecimal = { style: 'decimal', currency: 'SEK', minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true};
var formatOptionsPercent = { style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2};
//change formatting according to language 
export var decimalFormat = new Intl.NumberFormat('sv-SE', formatOptionsDecimal);

export var percentFormat = new Intl.NumberFormat('sv-SE', formatOptionsPercent);