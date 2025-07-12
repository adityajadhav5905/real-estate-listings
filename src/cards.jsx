import React, { useEffect, useState } from 'react';
import Card from './card.jsx';
import defaultListings from './property-details/listings';
import Deleteall from './deleteall.jsx';

const Cards = ({ onEnquireClick }) => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    try {
      const localListings = JSON.parse(localStorage.getItem('listings')) || [];
      const combined = [...defaultListings, ...localListings];
      setListings(combined);
    } catch (error) {
      console.error("Error reading listings:", error);
      setListings(defaultListings); 
    }
  }, []);

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
      {listings.length === 0 ? (
        <p className="col-span-full text-center text-gray-500">No listings available.</p>
      ) : (
        <>
          {listings.map((property, index) => (
            <Card
              key={index}
              {...property}
              onEnquireClick={onEnquireClick}
            />
          ))}

      
          <div className="col-span-full flex justify-center mt-6">
            <Deleteall />
          </div>
        </>
      )}
    </div>
  );
};

export default Cards;



