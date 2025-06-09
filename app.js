require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
app.use(express.json());

app.use(cors());

connectDB();
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.send('MongoDB connection is ready!');
});

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});

