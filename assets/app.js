// assets/app.js

// Función para cargar y procesar el archivo CSV
function processCSV() {
    const filePath = './data/Papua.csv';

    fetch(filePath)
        .then(response => response.text())
        .then(csvText => {
            Papa.parse(csvText, {
                header: true,
                complete: function(results) {
                    data = results.data;
                    filteredData = data; // Inicializar filteredData con los datos completos
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

// Procesar el archivo CSV al cargar la página
document.addEventListener('DOMContentLoaded', processCSV);