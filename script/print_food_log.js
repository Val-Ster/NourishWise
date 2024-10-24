// This file contain code to be able to print food log in a table form

document.getElementById('print-button').addEventListener('click', function () {
  printFoodLog();
});

function printFoodLog() {
  const printWindow = window.open('', '_blank');
  const content = document.getElementById('printable-area').innerHTML;

  printWindow.document.write(`
    <html>
      <head>
        <title>NourishWise | Print Food Log</title>
        <style>
          @media print {
            body {
              font - family: Arial;
              margin: 20px;
            }

            h1,
            h2,
            h3,
            h4{
              text - align: center;
            }

            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }

            th, td {
              border: 1px solid #333;
              padding: 8px;
              text-align: left;
            }
          }
        </style>
      </head>

      <body>
        <h1>NourishWise Daily Food Log Summary</h1>
        <h4>This is your daily food log by Day</h4>
        ${content}
  `);

  printWindow.document.close();
  printWindow.print();
}

