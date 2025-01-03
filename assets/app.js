// assets/app.js

let currentPage = 0;
let rowsPerPage = 1;
let data = [];

function processCSV() {
    const filePath = 'data/papua.csv';

    fetch(filePath)
        .then(response => response.text())
        .then(csvText => {
            Papa.parse(csvText, {
                header: true,
                complete: function(results) {
                    data = results.data;
                    currentPage = 0;
                    displayPage(currentPage);
                    updatePaginationControls();
                },
                error: function(error) {
                    console.error('Error al procesar el archivo CSV:', error);
                }
            });
        })
        .catch(error => {
            console.error('Error al cargar el archivo CSV:', error);
        });
}

function displayPage(page) {
    const table = document.getElementById('csvTable');
    table.innerHTML = '';

    if (data.length === 0) {
        table.innerHTML = '<tr><td class="border px-4 py-2">No hay datos para mostrar</td></tr>';
        return;
    }

    const start = page * rowsPerPage;
    const end = start + rowsPerPage;
    const pageData = data.slice(start, end);

    // Crear encabezados de la tabla
    const headers = Object.keys(data[0]);
    const headerRow = document.createElement('tr');
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        th.className = 'bg-gray-200 border px-4 py-2';
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // Crear filas de la tabla
    pageData.forEach(row => {
        const tr = document.createElement('tr');
        headers.forEach(header => {
            const td = document.createElement('td');
            td.textContent = row[header];
            td.className = 'border px-4 py-2';
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });
}

function updatePaginationControls() {
    const totalPages = Math.ceil(data.length / rowsPerPage);
    const paginationControls = document.getElementById('paginationControls');
    paginationControls.innerHTML = '';

    for (let i = 0; i < totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i + 1;
        button.className = 'bg-blue-500 text-white px-4 py-2 m-1 rounded';
        button.onclick = () => {
            currentPage = i;
            displayPage(currentPage);
        };
        paginationControls.appendChild(button);
    }
}

// Procesar el archivo CSV al cargar la página
document.addEventListener('DOMContentLoaded', processCSV);