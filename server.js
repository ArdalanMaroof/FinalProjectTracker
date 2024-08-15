const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const path = require('path');

const app = express();
const port = process.env.PORT || 5001;

// MongoDB connection
mongoose.connect('mongodb+srv://ardalanmaroof85:ardalan123@webfinalproject.yyllr.mongodb.net/expenseTracker')
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/expenses', expenseRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
