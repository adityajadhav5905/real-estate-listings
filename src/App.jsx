import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './navbar.jsx';
import Cards from './cards.jsx';
import Mainimg from './mainimg.jsx';
import Footer from './footer.jsx';
import Enquirypop from './enquirypop.jsx';
import ListingPage from './listingpage.jsx';

// Simple About Us page
function AboutUs() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4 text-blue-500">About Us</h1>
      <p className="max-w-xl text-center text-gray-200">We are passionate about helping you find your dream home. Our platform connects buyers, sellers, and renters with the best properties and trusted agents. Your real estate journey starts here!</p>
    </div>
  );
}

// Simple Contact Us page
function ContactUs() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4 text-blue-500">Contact Us</h1>
      <p className="max-w-xl text-center mb-4 text-gray-200">Have questions or need help? Reach out to us below.</p>
      <form className="bg-gray-800 p-6 rounded-lg w-full max-w-md space-y-4 shadow-lg">
        <input type="text" placeholder="Your Name" className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400" required />
        <input type="email" placeholder="Your Email" className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400" required />
        <textarea placeholder="Your Message" className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400" required />
        <button type="submit" className="w-full py-2 bg-blue-600 rounded text-white hover:bg-blue-700">Send</button>
      </form>
    </div>
  );
}

import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        localStorage.setItem('name', data.name);
        if (data.role === 'seller') {
          navigate('/seller/dashboard');
        } else {
          navigate('/');
        }
      } else {
        setError(data.error || 'Login failed');
      }
    } catch {
      setError('Login failed');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4 text-blue-500">Login</h1>
      <form onSubmit={handleLogin} className="bg-gray-800 p-6 rounded-lg w-full max-w-md space-y-4 shadow-lg">
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400" />
        <button type="submit" className="w-full py-2 bg-blue-600 rounded text-white hover:bg-blue-700">Login</button>
        {error && <p className="text-red-400 text-center">{error}</p>}
      </form>
    </div>
  );
}

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess('Registered successfully! Please login.');
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch {
      setError('Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4 text-blue-500">Register</h1>
      <form onSubmit={handleRegister} className="bg-gray-800 p-6 rounded-lg w-full max-w-md space-y-4 shadow-lg">
        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" required className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400" />
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400" />
        <select value={role} onChange={e => setRole(e.target.value)} className="w-full p-2 rounded bg-gray-700 text-white">
          <option value="user">User</option>
          <option value="seller">Seller</option>
        </select>
        <button type="submit" className="w-full py-2 bg-blue-600 rounded text-white hover:bg-blue-700">Register</button>
        {error && <p className="text-red-400 text-center">{error}</p>}
        {success && <p className="text-green-400 text-center">{success}</p>}
      </form>
    </div>
  );
}


function SellerDashboard() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    image: null,
  });
  const [adding, setAdding] = useState(false);
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  useEffect(() => {
    if (role !== 'seller' || !token) {
      setError('You must be logged in as a seller to view this page.');
      setLoading(false);
      return;
    }
    const fetchListings = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/seller/listings', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setListings(data);
        } else {
          setError(data.error || 'Failed to fetch listings');
        }
      } catch {
        setError('Failed to fetch listings');
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, [token, role]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this listing?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/seller/listings/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 204) {
        setListings(listings.filter(l => l._id !== id));
      } else {
        alert('Failed to delete listing');
      }
    } catch {
      alert('Failed to delete listing');
    }
  };

  const handleUpdate = async (id) => {
    const title = prompt('New title:');
    const price = prompt('New price:');
    if (!title || !price) return;
    try {
      const res = await fetch(`http://localhost:5000/api/seller/listings/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, price }),
      });
      const data = await res.json();
      if (res.ok) {
        setListings(listings.map(l => l._id === id ? data : l));
      } else {
        alert(data.error || 'Failed to update listing');
      }
    } catch {
      alert('Failed to update listing');
    }
  };

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    setForm(f => ({ ...f, [name]: files ? files[0] : value }));
  };

  const handleAddListing = async (e) => {
    e.preventDefault();
    setAdding(true);
    let imageData = '';
    if (form.image) {
      const reader = new FileReader();
      reader.readAsDataURL(form.image);
      await new Promise(resolve => {
        reader.onloadend = () => {
          imageData = reader.result;
          resolve();
        };
        reader.onerror = resolve;
      });
    }
    const newListing = {
      title: form.title,
      description: form.description,
      price: form.price,
      location: form.location,
      image: imageData,
    };
    try {
      const res = await fetch('http://localhost:5000/api/listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newListing),
      });
      const data = await res.json();
      if (res.ok) {
        setListings([data, ...listings]);
        setForm({ title: '', description: '', price: '', location: '', image: null });
      } else {
        alert(data.error || 'Failed to add listing');
      }
    } catch {
      alert('Failed to add listing');
    } finally {
      setAdding(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-400">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Seller Dashboard</h1>
      <form onSubmit={handleAddListing} className="bg-gray-800 p-6 rounded-lg mb-8 max-w-xl mx-auto space-y-4">
        <h2 className="text-xl font-semibold mb-2">Add New Property</h2>
        <input name="title" value={form.title} onChange={handleFormChange} placeholder="Title" required className="w-full p-2 rounded" />
        <textarea name="description" value={form.description} onChange={handleFormChange} placeholder="Description" required className="w-full p-2 rounded" />
        <input name="price" value={form.price} onChange={handleFormChange} placeholder="Price" required className="w-full p-2 rounded" />
        <input name="location" value={form.location} onChange={handleFormChange} placeholder="Location" required className="w-full p-2 rounded" />
        <input type="file" name="image" accept="image/*" onChange={handleFormChange} className="w-full p-2 rounded" />
        <button type="submit" className="w-full py-2 bg-blue-600 rounded text-white" disabled={adding}>{adding ? 'Adding...' : 'Add Listing'}</button>
      </form>
      <h2 className="text-2xl font-bold mb-4">Your Properties</h2>
      {listings.length === 0 ? (
        <p>No listings found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map(listing => (
            <div key={listing._id} className="bg-gray-800 rounded-lg p-4 shadow">
              <h2 className="text-xl font-semibold mb-2">{listing.title}</h2>
              {listing.image && <img src={listing.image} alt={listing.title} className="mb-2 rounded" style={{ maxHeight: 120 }} />}
              <p>{listing.description}</p>
              <p className="mt-2 font-bold">Price: {listing.price}</p>
              <p className="mt-2">Location: {listing.location}</p>
              <div className="flex gap-2 mt-4">
                <button onClick={() => handleUpdate(listing._id)} className="bg-blue-600 px-3 py-1 rounded">Update</button>
                <button onClick={() => handleDelete(listing._id)} className="bg-red-600 px-3 py-1 rounded">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [targetEmail, setTargetEmail] = useState('');

  const handleEnquireClick = (toemail) => {
    setTargetEmail(toemail);
    setShowPopup(true);
  };

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Mainimg />
              <Cards onEnquireClick={handleEnquireClick} />
              {showPopup && (
                <Enquirypop
                  onClose={() => setShowPopup(false)}
                  toemail={targetEmail}
                />
              )}
              <Footer />
            </>
          }
        />
        <Route path="/listing" element={<ListingPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/seller/dashboard" element={<SellerDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
