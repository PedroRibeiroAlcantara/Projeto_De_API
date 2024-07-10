const express = require('express');
const bodyParser = require('body-parser');
const osRoutes = require('./routes/osRoutes');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Use the OS routes
app.use('/api', osRoutes);

app.listen(port, () => {
  console.log('Server is running on http://localhost:${port}');
});
