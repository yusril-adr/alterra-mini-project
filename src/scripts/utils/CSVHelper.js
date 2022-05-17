import moment from 'moment';

const CSVHelper = {
  convertToDownloadAbleCSV(JSONData) {
    // If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    const arrData = typeof JSONData !== 'object' ? JSON.parse(JSONData) : JSONData;

    let CSV = 'sep=,\r\n\n';

    // Generate the Label/Header
    const label = this._generateLabel(arrData);

    // append Label row with line break
    CSV += `${label}\r\n`;

    // Geneerate every data
    CSV += this._generateEachData(arrData);

    // Initialize file format you want csv or xls
    const uri = `data:text/csv;charset=utf-8,${escape(CSV)}`;

    return uri;
  },

  _generateLabel(arrData) {
    let result = '';
    if (arrData.length > 0) {
      // This loop will extract the label from 1st index of on array
      Object.keys(arrData[0]).forEach((key) => {
        // Now convert each value to string and comma-seprated
        result += `${key.toUpperCase()},`;
      });

      result = result.slice(0, -1);
    }

    return result;
  },

  _generateEachData(arrData) {
    let result = '';
    // 1st loop is to extract each row
    arrData.forEach((data) => {
      let row = '';

      // 2nd loop will extract each column and convert it in string comma-seprated
      Object.keys(data).forEach((key) => {
        row += `"${data[key]}",`;
      });

      row.slice(0, row.length - 1);

      // add a line break after each row
      result += `${row}\r\n`;
    });

    return result;
  },

  downloadCSV(uri, { filename = 'CSV-File' } = '') {
    // Generate a file name
    // We add some date to make it unique filename
    const date = moment(new Date()).format('MM-DD-YYYY_kk-mm-ss');
    // this will remove the blank-spaces from the title and replace it with an underscore
    const outputFileName = `${filename.replace(/ /g, '_')}_${date}`;

    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension

    // this trick will generate a temp <a /> tag
    const link = document.createElement('a');
    link.href = uri;

    // set the visibility hidden so it will not effect on your web-layout
    link.style = 'visibility:hidden';
    link.download = `${outputFileName}.csv`;

    // this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },
};

export default CSVHelper;
