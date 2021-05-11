let csvToJson = require('convert-csv-to-json');

let fileInputName = 'Data_header.csv';
let fileOutputName = 'myOutputFile.json';

csvToJson.generateJsonFileFromCsv(fileInputName, fileOutputName);