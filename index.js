const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());

app.get('/nakshatra', async (req, res) => {
  const today = new Date();
  const y = today.getFullYear();
  const m = today.getMonth() + 1;
  const d = today.getDate();
  const lat = req.query.lat || 11.3164;     // Default: Nambiyur
  const lon = req.query.lon || 77.4342;
  const tz = req.query.tz || 5.5;           // Default: IST

  // Panchang.click API call (works for browserless/server-side fetch)
  const apiUrl = `https://panchang.click/api/v1/panchang?date=${y}-${m}-${d}&lat=${lat}&lng=${lon}&tz=${tz}`;
  
  try {
    const resp = await fetch(apiUrl);
    const json = await resp.json();
    // Return only the nakshatra field for simplicity
    res.json({ nakshatra: json.nakshatra || json.nakshatra_name || (json.data && json.data.nakshatra && json.data.nakshatra.name) });
  } catch (e) {
    res.json({ error: "API call failed" });
  }
});

app.get('/', (req, res) => {
  res.send('Nakshatra relay is running!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Nakshatra relay listening on port ${port}`));
