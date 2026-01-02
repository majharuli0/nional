const express = require('express');
const cors = require('cors');
const { PORT } = require('./src/config/env');
const writeRoutes = require('./src/routes/writeRoutes');
const socialRoutes = require('./src/routes/socialRoutes');

const app = express();

// Middleware
app.use(cors({ origin: '*' })); // Allow all origins for dev
app.use(express.json());

// Base Route
app.get('/', (req, res) => res.send('Nional API Core is Running 🚀'));

// API Routes
app.use('/api/write', writeRoutes);
app.use('/api/social', socialRoutes);

// Start Server
app.listen(PORT, () => console.log(`API running on port ${PORT}`));