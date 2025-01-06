// assets/app.js

// Función para cargar y procesar el archivo JSON
function processJSON() {
    const filePath = './data/data.json';

    fetch(filePath)
        .then(response => response.json())
        .then(jsonData => {
            data = jsonData;

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
            const urlParams = new URLSearchParams(window.location.search);
            currentPage = parseInt(urlParams.get('page')) || 0;
            displayPage(currentPage);
            updatePaginationControls();
        })
        .catch(error => {
            console.error('Error al cargar el archivo JSON:', error);
        });
}

// Procesar el archivo JSON al cargar la página
document.addEventListener('DOMContentLoaded', processJSON);