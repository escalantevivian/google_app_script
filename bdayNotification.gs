function emailAlert() {
  // today's date information
  var today = new Date();
  var todayMonth = today.getMonth() + 1;
  var todayDay = today.getDate();
  var todayYear = today.getFullYear();

  // getting data from spreadsheet
  var sheet = SpreadsheetApp.getActiveSheet();
  var startRow = 2; // First row of data to process
  var numRows = 100; // Number of rows to process

  var dataRange = sheet.getRange(startRow, 1, numRows, 999);
  var data = dataRange.getValues();
  var subject = 'Bday gift expirating today';
  var message = 'Message: ';
  var expireDateFormat = ''
  var date = false;
  //looping through all of the rows
  for (var i = 0; i < data.length; ++i) {
    var row = data[i];
    if (date == false){
      expireDateFormat = Utilities.formatDate(new Date(row[2]), 'PST', 'MM/dd/yyyy');
      subject = subject + ' - ' + expireDateFormat;
      date = true;
    }
    //expiration date information
    var expireDateMonth = new Date(row[2]).getMonth() + 1;
    var expireDateDay = new Date(row[2]).getDate();
    var expireDateYear = new Date(row[2]).getFullYear();
    //checking for today
    if (expireDateMonth === todayMonth && expireDateDay === todayDay && expireDateYear === todayYear) 
    {
      message = message + '\n ' + 'Gift from ' + row[0] + ' for ' + row[1] + ' expiring today' + '\n';
    }
  }
  MailApp.sendEmail('escalantevivian@yahoo.com', subject, message);
}
