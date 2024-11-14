const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Import cors
const dotenv = require('dotenv');
const app = express();
const PORT = 5000;

dotenv.config();

app.use(cors()); // Allow all origins
app.use(express.json());

// Endpoint to fetch contacts from HubSpot API
app.get('/api/get-contacts', async (req, res) => {
  try {
    console.log('getting')
    const response = await axios.get('https://api.hubapi.com/crm/v3/objects/contacts', {
      headers: {
        Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    res.json(response.data); // Send HubSpot API data back to the client
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contacts from HubSpot API', error: error.message });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
