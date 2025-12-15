const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({ origin: ['*.nional.com'] }));
app.use(express.json());

app.get('/', (req, res) => res.send('Nional API Core is Running'));

// Example Module: PDF
app.post('/api/pdf/convert', (req, res) => {
    res.json({ status: 'success', message: 'PDF converted' });
});

app.listen(3000, () => console.log('API running on port 3000'));