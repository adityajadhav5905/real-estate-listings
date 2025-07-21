
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = 'your_jwt_secret_key'; // Change this in production

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/realestate', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));


// User/Seller schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['user', 'seller'], default: 'user' },
});
const User = mongoose.model('User', userSchema);

// Listing schema
const listingSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  price: String,
  location: String,
  toemail: String,
  name: String,
  phone: String,
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});
const Listing = mongoose.model('Listing', listingSchema);

// Auth: Register
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email already registered' });
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed, role });
    await user.save();
    res.status(201).json({ message: 'Registered successfully' });
  } catch (err) {
    console.error('Registration error:', err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    res.status(500).json({ error: 'Registration failed: ' + err.message });
  }
});

// Auth: Login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, role: user.role, name: user.name });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Middleware to verify JWT
function auth(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: 'No token' });
  const token = header.split(' ')[1];
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// Get all listings
app.get('/api/listings', async (req, res) => {
  try {
    const listings = await Listing.find();
    res.json(listings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch listings' });
  }
});


// Add a new listing (seller only)
app.post('/api/listings', auth, async (req, res) => {
  try {
    if (req.user.role !== 'seller') return res.status(403).json({ error: 'Only sellers can add listings' });
    const listing = new Listing({ ...req.body, seller: req.user.userId });
    await listing.save();
    res.status(201).json(listing);
  } catch (error) {
    res.status(400).json({ error: 'Failed to add listing' });
  }
});


// Seller dashboard: get listings for logged-in seller
app.get('/api/seller/listings', auth, async (req, res) => {
  try {
    if (req.user.role !== 'seller') return res.status(403).json({ error: 'Only sellers can view dashboard' });
    const listings = await Listing.find({ seller: req.user.userId });
    res.json(listings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch seller listings' });
  }
});

// Seller dashboard: delete a listing
app.delete('/api/seller/listings/:id', auth, async (req, res) => {
  try {
    if (req.user.role !== 'seller') return res.status(403).json({ error: 'Only sellers can delete listings' });
    const result = await Listing.deleteOne({ _id: req.params.id, seller: req.user.userId });
    if (result.deletedCount === 0) return res.status(404).json({ error: 'Listing not found or not yours' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete listing' });
  }
});

// Seller dashboard: update a listing
app.put('/api/seller/listings/:id', auth, async (req, res) => {
  try {
    if (req.user.role !== 'seller') return res.status(403).json({ error: 'Only sellers can update listings' });
    const updated = await Listing.findOneAndUpdate(
      { _id: req.params.id, seller: req.user.userId },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Listing not found or not yours' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update listing' });
  }
});

// Delete all user listings
app.delete('/api/listings', async (req, res) => {
  try {
    await Listing.deleteMany({});
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete listings' });
  }
});

app.listen(5000, () => {
  console.log('Backend running on http://localhost:5000');
});