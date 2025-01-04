// assets/cards.js

// Función para crear una tarjeta (card) a partir de una fila de datos
function createCard(row) {
    const card = document.createElement('div');
    card.className = 'bg-white shadow-md rounded p-4 mb-4';

    Object.keys(row).forEach(header => {
        const p = document.createElement('p');
        p.className = 'mb-2';
        p.innerHTML = `<strong>${header}:</strong> ${row[header]}`;
        card.appendChild(p);
    });

    return card;
}