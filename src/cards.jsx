
import React, { useEffect, useState } from 'react';
import Card from './card.jsx';
import Deleteall from './deleteall.jsx';

const Cards = ({ onEnquireClick }) => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/listings');
        const data = await res.json();
        setListings(data);
      } catch (error) {
        console.error('Error fetching listings:', error);
        setListings([]);
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
      {loading ? (
        <p className="col-span-full text-center text-gray-500">Loading listings...</p>
      ) : listings.length === 0 ? (
        <p className="col-span-full text-center text-gray-500">No listings available.</p>
      ) : (
        <>
          {listings.map((property, index) => (
            <Card
              key={property._id || index}
              {...property}
              onEnquireClick={onEnquireClick}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default Cards;



