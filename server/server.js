// server/server.js
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const mongoose = require('mongoose'); // Add this import

const app = express();

// Connect Database and add connection monitoring
connectDB();

mongoose.connection.on('connected', () => {
  console.log('MongoDB Connected');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Init Middleware
app.use(express.json());
app.use(cors({ 
  origin: 'http://localhost:3000', 
  credentials: true 
}));

// Add error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/tasks', require('./routes/tasks'));

// Add a catch-all route handler for undefined routes
app.use('*', (req, res) => {
  console.log('Route not found:', req.originalUrl);
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));