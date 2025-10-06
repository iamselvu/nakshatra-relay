const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());

app.get('/nakshatra', async (req, res) => {
  const today = new Date();
  const payload = {
    day: today.getDate(),
    month: today.getMonth() + 1,
    year: today.getFullYear(),
    lat: req.query.lat || 11.3164,
    lon: req.query.lon || 77.4342,
    tzone: req.query.tz || 5.5
  };
  try {
    const resp = await fetch('https://freeastrologyapi.com/api/v1/complete-panchang', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'n0UYvDWD9h1fu0AQwzhA51IMUIABgrFJ87ZamUGH'
      },
      body: JSON.stringify(payload)
    });
    const json = await resp.json();
    res.json({ nakshatra: json.nakshatra || json.nakshatra_name });
  } catch (e) {
    res.json({ error: "API call failed", detail: e.toString() });
  }
});

app.get('/', (req, res) => {
  res.send('Nakshatra relay is running!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Nakshatra relay listening on port ${port}`));
