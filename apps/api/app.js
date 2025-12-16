const express = require('express');
const cors = require('cors');
const { PORT } = require('./src/config/env');
const writeRoutes = require('./src/routes/writeRoutes');

const app = express();

// Middleware
app.use(cors({ origin: '*' })); // Allow all origins for dev
app.use(express.json());

// Base Route
app.get('/', (req, res) => res.send('Nional API Core is Running 🚀'));

// API Routes
app.use('/api/write', writeRoutes);

// Example other module (placeholder)
app.post('/api/pdf/convert', (req, res) => {
    res.json({ status: 'success', message: 'PDF converted' });
});

// Start Server
app.listen(PORT, () => console.log(`API running on port ${PORT}`));