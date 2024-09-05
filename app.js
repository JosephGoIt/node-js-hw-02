
require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const contactsRouter = require('./routes/api/contacts');
const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

const mongoDBUrl = process.env.MONGO_DB_URL || 'your-mongo-db-url';

const connectDB = async () => {
    try {
      const conn = await mongoose.connect(mongoDBUrl);
      console.log(`Database connection successful: ${conn.connection.host}`);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  };

app.use('/api/contacts', contactsRouter);

app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});

module.exports = {app, connectDB};
