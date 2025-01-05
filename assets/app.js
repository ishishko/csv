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

                    // Filtrar los datos para eliminar aquellos sin "Scientific name"
                    data = data.filter(row => row["Scientific name"] && row["Scientific name"].trim() !== '');

                    // Ordenar los datos alfabéticamente por el campo "Scientific name"
                    data.sort((a, b) => {
                        const nameA = a["Scientific name"].toLowerCase();
                        const nameB = b["Scientific name"].toLowerCase();
                        if (nameA < nameB) return -1;
                        if (nameA > nameB) return 1;
                        return 0;
                    });

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