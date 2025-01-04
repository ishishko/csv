// assets/buscador.js

// Función para mostrar el menú desplegable de resultados de búsqueda
function showSearchResults() {
    const searchResults = document.getElementById('searchResults');
    if (searchResults.innerHTML.trim() !== '') {
        searchResults.style.display = 'block';
    }
}

// Función para ocultar el menú desplegable de resultados de búsqueda
function hideSearchResults() {
    const searchResults = document.getElementById('searchResults');
    setTimeout(() => {
        searchResults.style.display = 'none';
    }, 200); // Retraso para permitir hacer clic en los resultados
}

// Función para resaltar las coincidencias en negrita
function highlightMatch(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<strong>$1</strong>');
}

// Función para filtrar los datos basados en la búsqueda
function filterData() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = '';

    // No mostrar resultados si no se ingresó ningún carácter
    if (searchInput.trim() === '') {
        hideSearchResults();
        return;
    }

    // Filtrar los datos basados en los campos específicos
    filteredData = data.filter(row => {
        return ['Scientific name', 'Synonym', 'Common Name'].some(key => 
            row[key] && row[key].toLowerCase().includes(searchInput)
        );
    });

    // Mostrar los primeros 10 resultados en el menú desplegable
    const resultsToShow = filteredData.slice(0, 10);
    resultsToShow.forEach((row, index) => {
        const resultItem = document.createElement('div');
        resultItem.className = 'hover:bg-blue-400 text-gray-700';
        resultItem.innerHTML = `
            <span class="flex-1">${highlightMatch(row['Scientific name'] || '', searchInput)}</span>
            <span class="flex-1">${highlightMatch(row['Synonym'] || '', searchInput)}</span>
            <span class="flex-1">${highlightMatch(row['Common Name'] || '', searchInput)}</span>
        `;
        resultItem.onclick = () => {
            currentPage = index;
            displayPage(currentPage);
            updatePaginationControls();
            searchResults.innerHTML = ''; // Limpiar el menú desplegable
            hideSearchResults(); // Ocultar el menú desplegable
        };
        searchResults.appendChild(resultItem);
    });

    if (resultsToShow.length > 0) {
        showSearchResults();
    } else {
        hideSearchResults();
    }

    currentPage = 0;
    displayPage(currentPage);
    updatePaginationControls();
}