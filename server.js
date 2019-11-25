const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const catrgoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');

const app = express();

// Connect to MongoDB
mongoose
  .connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));
  
mongoose.set('useFindAndModify', false);

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(cors());

// Use Routes
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', catrgoryRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);
app.use('/api', orderRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
