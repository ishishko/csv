// app.js

function processCSV() {
    const fileInput = document.getElementById('csvFileInput');
    const file = fileInput.files[0];

    if (!file) {
        alert('Por favor, selecciona un archivo CSV.');
        return;
    }

    Papa.parse(file, {
        header: true,
        complete: function(results) {
            const data = results.data;
            displayTable(data);
        },
        error: function(error) {
            console.error('Error al procesar el archivo CSV:', error);
        }
    });
}

function displayTable(data) {
    const table = document.getElementById('csvTable');
    table.innerHTML = '';

    if (data.length === 0) {
        table.innerHTML = '<tr><td>No hay datos para mostrar</td></tr>';
        return;
    }

    // Crear encabezados de la tabla
    const headers = Object.keys(data[0]);
    const headerRow = document.createElement('tr');
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // Crear filas de la tabla
    data.forEach(row => {
        const tr = document.createElement('tr');
        headers.forEach(header => {
            const td = document.createElement('td');
            td.textContent = row[header];
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });
}