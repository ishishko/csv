// assets/paginacion.js

let currentPage = 0;
let rowsPerPage = 1; // Mostrar 1 resultado por página
let data = [];
const maxPagesToShow = 7; // Mostrar un máximo de 7 páginas en la paginación

function displayPage(page) {
    const container = document.getElementById('csvContainer');
    if (!container) {
        console.error('El contenedor csvContainer no se encuentra en el DOM.');
        return;
    }
    container.innerHTML = '';

    if (data.length === 0) {
        container.innerHTML = '<div class="border px-4 py-2">No hay datos para mostrar</div>';
        return;
    }

    const start = page * rowsPerPage;
    const end = start + rowsPerPage;
    const pageData = data.slice(start, end);

    // Crear tarjetas para cada fila
    pageData.forEach(row => {
        const card = createCard(row);
        container.appendChild(card);
    });
}

function updatePaginationControls() {
    const totalPages = Math.ceil(data.length / rowsPerPage);
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