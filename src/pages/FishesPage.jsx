import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import "./pages.css";
import data from '../data/data.json';

const FishesPage = () => {
    const [fishes, setFishes] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedFish, setSelectedFish] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredFishes, setFilteredFishes] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [selectedFamily, setSelectedFamily] = useState('');
    const fishesPerPage = 12;

    useEffect(() => {
        // Limpiar los datos para eliminar caracteres raros y el texto entre []
        const cleanData = data.map(fish => ({
            ...fish,
            "Scientific name": fish["Scientific name"].replace(/[^\w\s]/gi, ''),
            "Common Name": fish["Common Name"].replace(/[^\w\s]/gi, ''),
            "Family": fish["Family"].replace(/\[.*?\]/g, '').trim(),
            "Synonym": fish["Synonym"].replace(/[^\w\s]/gi, '')
        }));

        // Ordenar los datos alfabéticamente según el Scientific name
        const sortedData = cleanData.sort((a, b) => a["Scientific name"].localeCompare(b["Scientific name"]));
        setFishes(sortedData);
    }, []);

    useEffect(() => {
        // Manejar clics fuera del cuadro de resultados de búsqueda para ocultarlo
        const handleClickOutside = (event) => {
            if (showResults && !event.target.closest('#search-results') && !event.target.closest('#search-input')) {
                setShowResults(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showResults]);

    // Extraer todas las familias únicas
    const families = [...new Set(fishes.map(fish => fish["Family"]))];

    // Manejar el evento de presionar la tecla Enter en el campo de búsqueda
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setShowResults(false);
        }
    };

    // Manejar el cambio de página en la paginación
    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    // Manejar el clic en un pez para mostrar/ocultar detalles
    const handleFishClick = (fish) => {
        setSelectedFish(selectedFish === fish["Scientific name"] ? null : fish["Scientific name"]);
        setShowResults(false); // Ocultar el cuadro de resultados
    };

    // Manejar el cambio en el campo de búsqueda
    const handleSearchChange = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        setSearchTerm(searchTerm);
        setCurrentPage(0); // Reiniciar la página actual al realizar una nueva búsqueda
        filterFishes(searchTerm, selectedFamily);
        setShowResults(true); // Mostrar el cuadro de resultados
    };

    // Manejar el cambio en el campo select de familia
    const handleFamilyChange = (event) => {
        const family = event.target.value;
        setSelectedFamily(family);
        setCurrentPage(0); // Reiniciar la página actual al realizar una nueva búsqueda
        filterFishes(searchTerm, family);
    };

    // Filtrar los peces según el término de búsqueda y la familia seleccionada
    const filterFishes = (searchTerm, family) => {
        const filtered = fishes.filter(fish => 
            (fish["Scientific name"].toLowerCase().includes(searchTerm) ||
            fish["Common Name"].toLowerCase().includes(searchTerm) ||
            fish["Family"].toLowerCase().includes(searchTerm) ||
            fish["Synonym"].toLowerCase().includes(searchTerm)) &&
            (family === '' || fish["Family"] === family)
        );
        setFilteredFishes(filtered);
    };

    // Resaltar el texto coincidente en los resultados de búsqueda
    const highlightText = (text, highlight) => {
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return parts.map((part, index) => 
            part.toLowerCase() === highlight.toLowerCase() ? <span key={index} className="highlight">{part}</span> : part
        );
    };

    const offset = currentPage * fishesPerPage;
    const currentFishes = filteredFishes.length > 0 ? filteredFishes.slice(offset, offset + fishesPerPage) : fishes.slice(offset, offset + fishesPerPage);
    const pageCount = Math.ceil((filteredFishes.length > 0 ? filteredFishes.length : fishes.length) / fishesPerPage);

    return (
        <div id="fishes" className="flex flex-col h-full m-2 p-2 bg-blue-200 bg-opacity-50 rounded-lg max-h-[85%]">
            <div className="max-h-[100%] rounded-lg">
                <div className="flex mb-4">
                    <input 
                        id="search-input"
                        type="text" 
                        placeholder="Search..." 
                        value={searchTerm} 
                        onChange={handleSearchChange} 
                        onKeyDown={handleKeyDown} // Añadir el manejador de eventos para la tecla Enter
                        className="p-2 rounded-lg border border-gray-300 w-full mr-2"
                    />
                    <select 
                        value={selectedFamily} 
                        onChange={handleFamilyChange} 
                        className="p-2 rounded-lg border border-gray-300"
                    >
                        <option value="">All Families</option>
                        {families.map(family => (
                            <option key={family} value={family}>{family}</option>
                        ))}
                    </select>
                </div>
                {showResults && (
                    <div id="search-results" className="absolute bg-white border border-gray-300 rounded-lg shadow-lg mt-2 w-full z-10">
                        <ul>
                            {filteredFishes.slice(0, 10).map(fish => (
                                <li 
                                    key={fish["Scientific name"]} 
                                    className="p-2 hover:bg-gray-200 cursor-pointer"
                                    onClick={() => handleFishClick(fish)}
                                >
                                    <div className="grid grid-cols-3">
                                        <span>{highlightText(fish["Scientific name"], searchTerm)}</span>
                                        <span>{highlightText(fish["Common Name"], searchTerm)}</span>
                                        <span>{highlightText(fish["Family"], searchTerm)}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <ul className='overflow-y-auto max-h-[85%] relative'>
                    {currentFishes.map(fish => (
                        <li 
                            key={fish["Scientific name"]} 
                            className={`m-2 p-2 bg-white bg-opacity-75 rounded-lg shadow cursor-pointer relative ${selectedFish === fish["Scientific name"] ? 'expanded' : ''}`}
                            onClick={() => handleFishClick(fish)}
                        >
                            <div className="grid grid-cols-3 gap-4 whitespace-nowrap overflow-hidden text-ellipsis">
                                <h2 className="text-xl font-bold">{highlightText(fish["Scientific name"], searchTerm)}</h2>
                                <p className="ml-4 overflow-hidden text-ellipsis"><strong>Common Name:</strong> {highlightText(fish["Common Name"], searchTerm)}</p>
                                <p className="ml-4 overflow-hidden text-ellipsis"><strong>Family:</strong> {highlightText(fish["Family"], searchTerm)}</p>
                            </div>
                            {selectedFish === fish["Scientific name"] && (
                                <div className="mt-2 w-full bg-white bg-opacity-90 rounded-lg shadow p-4 z-10">
                                    <p><strong>Synonym:</strong> {fish["Synonym"]}</p>
                                    <p><strong>Native/Introduced:</strong> {fish["Native/Introduced"]}</p>
                                    <p><strong>Status/IUCN:</strong> {fish["Status/IUCN"]}</p>
                                    <p><strong>COI:</strong> {fish["COI"]}</p>
                                    <p><strong>Key Features:</strong> {fish["Key Features"]}</p>
                                    <p><strong>Description:</strong> {fish["Description"]}</p>
                                    <p><strong>Body Size:</strong> {fish["Body Size"]}</p>
                                    <p><strong>Ecology:</strong> {fish["Ecology"]}</p>
                                    <p><strong>Distribution:</strong> {fish["Distribution"]}</p>
                                    <p><strong>Habitat Traits:</strong> {fish["Habitat Traits"]}</p>
                                    <p><strong>Other information:</strong> {fish["Other information"]}</p>
                                    <p><strong>Citation:</strong> <a href={fish["Citation"]} target="_blank" rel="noopener noreferrer">View Source</a></p>
                                    <p><strong>Picture:</strong> <a href={fish["Picture Reference"]} target="_blank" rel="noopener noreferrer">View Image</a></p>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pageCount}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}
                />
            </div>
        </div>
    );
};

export default FishesPage;