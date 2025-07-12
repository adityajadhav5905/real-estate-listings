import React, { useState } from 'react';

const ListingPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    price: '',
    title: '',
    description: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

   
    if (!formData.image) {
      alert("Please select an image");
      return;
    }
    
   
    const reader = new FileReader();
    reader.readAsDataURL(formData.image);

    reader.onloadend = () => {
      const newListing = {
        title: formData.title,
        description: formData.description,
        price: formData.price,
        location: formData.location,
        toemail: formData.email,
   
        image: reader.result,
        name: formData.name,
        phone: formData.phone,
      };


      const storedListings = JSON.parse(localStorage.getItem('listings')) || [];
      storedListings.push(newListing);
      localStorage.setItem('listings', JSON.stringify(storedListings));

      alert("Listing submitted and saved!");
      window.location.href = '/';
    };

    reader.onerror = (error) => {
      console.error("Error reading file:", error);
      alert("Image upload failed. Please try again.");
    };
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-700 p-8 rounded-xl shadow-md w-full max-w-xl space-y-6 my-30"
      >
        <h2 className="text-2xl font-bold text-center text-gray-100">
          Add a New Property Listing
        </h2>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
          className="w-full p-3 text-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-50"
        />

        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          required
          className="w-full p-3 text-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-50"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email Address"
          required
          className="w-full p-3 text-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-50"
        />

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Ad Title"
          required
          className="w-full p-3 text-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-50"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Ad Description"
          required
          className="w-full p-3 text-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-50"
        ></textarea>

        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Property Location"
          required
          className="w-full p-3 text-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-50"
        />

        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price (e.g., ₹1.5 Cr)"
          required
          className="w-full p-3 text-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-50"
        />

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          required
          className="w-full p-3 text-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-50"
        />

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-gray-300 font-medium rounded-lg hover:bg-blue-700"
        >
          Submit Listing
        </button>
      </form>
    </div>
  );
};

export default ListingPage;
