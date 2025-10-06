const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());

app.get('/nakshatra', async (req, res) => {
  const today = new Date();
  const payload = {
    api_key: '596a3157-c4e0-5604-85b7-8267c944679c',
    date: `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`,
    lat: req.query.lat || '11.3164',     // Nambiyur
    lon: req.query.lon || '77.4342',
    tzone: req.query.tz || '5.5'
  };

  try {
    const response = await fetch('https://vedicastroapi.com/api/panchang/basic', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const json = await response.json();
    res.json({
      nakshatra: json.nakshatra?.name || json.nakshatra // supports both possible formats
    });
  } catch (e) {
    res.json({ error: 'API call failed', detail: e.toString() });
  }
});

app.get('/', (req, res) => {
  res.send('Nakshatra relay is running!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Nakshatra relay listening on port ${port}`));
