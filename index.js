let csvToJson = require('convert-csv-to-json');

let fileInputName = 'Data_header.csv';
let fileOutputName = 'groupe8.json';

csvToJson.generateJsonFileFromCsv(fileInputName, fileOutputName);