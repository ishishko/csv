// assets/paginacion.js

// Variables globales para manejar la paginación y los datos
let currentPage = 0;
let rowsPerPage = 1; // Mostrar 1 resultado por página
let data = [];
let filteredData = [];
const maxPagesToShow = 7; // Mostrar un máximo de 7 páginas en la paginación

// Función para mostrar una página específica
function displayPage(page) {
    const container = document.getElementById('cardsContainer');
    if (!container) {
        console.error('El contenedor cardsContainer no se encuentra en el DOM.');
        return;
    }
    container.innerHTML = '';

    if (filteredData.length === 0) {
        container.innerHTML = '<div class="border rounded-2xl px-4 py-2 mx-auto">No data to display</div>';
        return;
    }

    const start = page * rowsPerPage;
    const end = start + rowsPerPage;
    const pageData = filteredData.slice(start, end);

    // Crear tarjetas para cada fila
    pageData.forEach(row => {
        const card = createCard(row);
        container.appendChild(card);
    });
}

// Función para actualizar los controles de paginación
function updatePaginationControls() {
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const paginationControls = document.getElementById('paginationControls');
    if (!paginationControls) {
        console.error('El contenedor paginationControls no se encuentra en el DOM.');
        return;
    }
    paginationControls.innerHTML = '';

    const startPage = Math.max(0, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow);

    // Botón para la primera página
    if (startPage > 0) {
        const firstButton = document.createElement('button');
        firstButton.textContent = 1;
        firstButton.className = 'bg-blue-500 text-white px-4 py-2 m-1 rounded';
        firstButton.onclick = () => {
            currentPage = 0;
            displayPage(currentPage);
            updatePaginationControls();
        };
        paginationControls.appendChild(firstButton);

        if (startPage > 1) {
            const dots = document.createElement('span');
            dots.textContent = '...';
            dots.className = 'px-2';
            paginationControls.appendChild(dots);
        }
    }

    // Botón para bajar 10 páginas
    if (currentPage >= 10) {
        const prev10Button = document.createElement('button');
        prev10Button.textContent = '<<';
        prev10Button.className = 'bg-blue-500 text-white px-4 py-2 m-1 rounded';
        prev10Button.onclick = () => {
            currentPage = Math.max(0, currentPage - 10);
            displayPage(currentPage);
            updatePaginationControls();
        };
        paginationControls.appendChild(prev10Button);
    }

    // Botones para las páginas visibles
    for (let i = startPage; i < endPage; i++) {
        const button = document.createElement('button');
        button.textContent = i + 1;
        button.className = `px-4 py-2 m-1 rounded ${i === currentPage ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white'}`;
        button.onclick = () => {
            currentPage = i;
            displayPage(currentPage);
            updatePaginationControls();
        };
        paginationControls.appendChild(button);
    }

    // Botón para subir 10 páginas
    if (currentPage < totalPages - 10) {
        const next10Button = document.createElement('button');
        next10Button.textContent = '>>';
        next10Button.className = 'bg-blue-500 text-white px-4 py-2 m-1 rounded';
        next10Button.onclick = () => {
            currentPage = Math.min(totalPages - 1, currentPage + 10);
            displayPage(currentPage);
            updatePaginationControls();
        };
        paginationControls.appendChild(next10Button);
    }

    // Botón para la última página
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            const dots = document.createElement('span');
            dots.textContent = '...';
            dots.className = 'px-2';
            paginationControls.appendChild(dots);
        }

        const lastButton = document.createElement('button');
        lastButton.textContent = totalPages;
        lastButton.className = 'bg-blue-500 text-white px-4 py-2 m-1 rounded';
        lastButton.onclick = () => {
            currentPage = totalPages - 1;
            displayPage(currentPage);
            updatePaginationControls();
        };
        paginationControls.appendChild(lastButton);
    }
}