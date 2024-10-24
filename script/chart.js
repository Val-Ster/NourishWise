// Function to print the food log
function printFoodLog() {
  const printWindow = window.open('', '_blank');

  // Get the current state of the food log table
  const foodLogTable = document.getElementById('food-log').innerHTML;
  const currentWeight = document.getElementById('current-weight').innerText;
  const totalCalories = document.getElementById('total-calories').innerText;

  // Create the printable content
  const content = `
    <html>
      <head>
        <title>Print Food Log</title>
        <style>
          body { font-family: Arial; margin: 20px; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #000; padding: 8px; }
          h1, h2 { text-align: center; }
        </style>
      </head>
      <body>
        <h1>Daily Food Log Summary</h1>
        <h2>Current Weight: ${currentWeight}</h2>
        <h3>Food Log for Today</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Meal</th>
              <th>Calories</th>
            </tr>
          </thead>
          <tbody>
            ${foodLogTable}
          </tbody>
        </table>
        <h4>Total Calories: ${totalCalories}</h4>
      </body>
    </html>
  `;

  printWindow.document.write(content);
  printWindow.document.close();
  printWindow.print();
}

// Add event listener to the print button
document.getElementById('print-button').addEventListener('click', printFoodLog);
