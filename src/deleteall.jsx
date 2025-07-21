import React from 'react';

const Deleteall = ({ onListingsCleared }) => {
  const handleDeleteAll = async () => {
    if (confirm("Are you sure you want to clear all user listings?")) {
      try {
        const res = await fetch('http://localhost:5000/api/listings', {
          method: 'DELETE',
        });
        if (res.status === 204) {
          alert('All listings cleared!');
          if (onListingsCleared) onListingsCleared();
        } else {
          alert('Failed to clear listings.');
        }
      } catch (error) {
        alert('Failed to clear listings. Please try again.');
      }
    }
  };
  return (
    <div className="w-full flex justify-center my-4">
      <button
        onClick={handleDeleteAll}
        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold shadow-md"
      >
        Clear All User Listings
      </button>
    </div>
  );
};

export default Deleteall;
