const scriptURL =
  "https://script.google.com/macros/s/AKfycbwPDlR6KFbNlL83MOtgkM3fMJ33HaW_zJK5IDrscsCU_kV7amIKHCsvHdLu2bOdXhkyFA/exec";

let fetchedData = []; // Зберігаємо оригінальні дані
let filterTimer;

// Функція для отримання даних кожні 5 секунд
setInterval(fetchData, 5000);

async function fetchData() {
  try {
    const response = await fetch(scriptURL);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    console.log(data);
    fetchedData = data.slice(1, -1); // Зберігаємо дані, пропустивши заголовок і останній рядок
    applyFilters(); // Застосовуємо фільтри до нових даних
  } catch (error) {
    console.error("Помилка завантаження даних:", error);
  }
}

function displayData(data) {
  const tableBody = document
    .getElementById("data-table")
    .getElementsByTagName("tbody")[0];
  tableBody.innerHTML = ""; // Очищаємо таблицю перед додаванням нових даних

  data.forEach((rowData) => {
    const row = document.createElement("tr");

    rowData.forEach((cellData) => {
      const cell = document.createElement("td");
      cell.textContent = cellData;
      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  });
}

// Функція для фільтрування даних
function applyFilters() {
  const nameFilter = document.getElementById("nameFilter").value.toLowerCase();
  const emailFilter = document
    .getElementById("emailFilter")
    .value.toLowerCase();

  const filteredData = fetchedData.filter((row) => {
    const nameMatch = row[0].toLowerCase().includes(nameFilter);
    const emailMatch = row[1].toString().toLowerCase().includes(emailFilter);
    return nameMatch && emailMatch;
  });

  displayData(filteredData); // Відображаємо відфільтровані дані
}

// Запуск основної функції завантаження даних
fetchData();
