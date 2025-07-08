import React from 'react';

const Deleteall = () => {
  return (
    <div className="w-full flex justify-center my-4">
      <button
        onClick={() => {
          if (confirm("Are you sure you want to clear all user listings?")) {
            localStorage.removeItem('listings');
            window.location.reload();
          }
        }}
        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold shadow-md"
      >
        Clear All User Listings
      </button>
    </div>
  );
};

export default Deleteall;
