// filepath: /home/shimbo/Desktop/router/src/pages/FishesPage.jsx
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
    const fishesPerPage = 12;

    useEffect(() => {
        // Ordenar los datos alfabéticamente según el Scientific name
        const sortedData = data.sort((a, b) => a["Scientific name"].localeCompare(b["Scientific name"]));
        setFishes(sortedData);
    }, []);

    useEffect(() => {
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

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const handleFishClick = (fish) => {
        setSelectedFish(selectedFish === fish["Scientific name"] ? null : fish["Scientific name"]);
        setShowResults(false); // Ocultar el cuadro de resultados
    };

    const handleSearchChange = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        setSearchTerm(searchTerm);
        const filtered = fishes.filter(fish => 
            fish["Scientific name"].toLowerCase().includes(searchTerm) ||
            fish["Common Name"].toLowerCase().includes(searchTerm) ||
            fish["Family"].toLowerCase().includes(searchTerm) ||
            fish["Synonym"].toLowerCase().includes(searchTerm)
        ).slice(0, 10); // Limitar a los primeros 10 resultados
        setFilteredFishes(filtered);
        setShowResults(true); // Mostrar el cuadro de resultados
    };

    const offset = currentPage * fishesPerPage;
    const currentFishes = filteredFishes.length > 0 ? filteredFishes.slice(offset, offset + fishesPerPage) : fishes.slice(offset, offset + fishesPerPage);
    const pageCount = Math.ceil((filteredFishes.length > 0 ? filteredFishes.length : fishes.length) / fishesPerPage);

    return (
        <div id="fishes" className="flex flex-col h-full m-2 p-2 bg-blue-200 bg-opacity-50 rounded-lg max-h-[85%]">
            <div className="max-h-[100%] rounded-lg">
                <input 
                    id="search-input"
                    type="text" 
                    placeholder="Search..." 
                    value={searchTerm} 
                    onChange={handleSearchChange} 
                    className="mb-4 p-2 rounded-lg border border-gray-300 w-full"
                />
                {showResults && (
                    <div id="search-results" className="absolute bg-white border border-gray-300 rounded-lg shadow-lg mt-2 w-full z-10">
                        <ul>
                            {filteredFishes.map(fish => (
                                <li 
                                    key={fish["Scientific name"]} 
                                    className="p-2 hover:bg-gray-200 cursor-pointer"
                                    onClick={() => handleFishClick(fish)}
                                >
                                    <div className="grid grid-cols-3">
                                        <span>{fish["Scientific name"]}</span>
                                        <span>{fish["Common Name"]}</span>
                                        <span>{fish["Family"]}</span>
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
                                <h2 className="text-xl font-bold">{fish["Scientific name"]}</h2>
                                <p className="ml-4 overflow-hidden text-ellipsis"><strong>Common Name:</strong> {fish["Common Name"]}</p>
                                <p className="ml-4 overflow-hidden text-ellipsis"><strong>Family:</strong> {fish["Family"]}</p>
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
                    marginPagesDisplayed={2}
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