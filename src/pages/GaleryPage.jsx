import React from 'react';

const GaleryPage = () => {
    // URLs de ejemplo para las imágenes
    const imageUrls = Array(30).fill('../assets/300.png');

    return (
        <div id="galery" className="flex flex-col h-full m-2 p-2 bg-blue-200 bg-opacity-50 rounded-lg max-h-[85%] overflow-y-auto">
            <div className="grid grid-cols-3 gap-4 mt-4">
                {imageUrls.map((url, index) => (
                    <div key={index} className="overflow-hidden rounded-lg shadow-lg">
                        <img src={url} alt={`Gallery Image ${index + 1}`} className="object-cover w-full h-48" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GaleryPage;
