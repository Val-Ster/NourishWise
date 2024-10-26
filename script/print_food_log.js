// This file contain code to be able to print food log in a table form

document.getElementById('print-button').addEventListener('click', function () {
  printFoodLog();
});

function printFoodLog() {
  const printWindow = window.open('', '_blank');
  const content = document.getElementById('printable-area').innerHTML;
  const currentWeight = document.getElementById('weight-display').innerText;

  printWindow.document.write(`
    <html>
      <head>
        <title>NourishWise | Print Food Log</title>
        <style>
          @media print {
            body {
              font-family: Arial;
              margin: 20px;
            }
            
            .logo {
              width: 5rem;
              display: block;
            }

            .log-heading{
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-contents: center;
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
        <div class="log-heading">
          <h1>NourishWise Daily Food Log Summary</h1>
          <img src="assets/diet_logo_t.png" class="logo">
          <h4>This is your daily food log by Day</h4>
        </div>
        <h2>Current Weight: ${currentWeight}</h2>

        ${content}
  `);

  // printWindow.document.write(content);
  printWindow.document.close();
  printWindow.print();
}

