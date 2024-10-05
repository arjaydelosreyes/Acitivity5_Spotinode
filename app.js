const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const musicRoutes = require('./routes/music');
app.use('/music', musicRoutes);

// Define a route for the root URL
app.get('/', (req, res) => {
    res.redirect('/music'); // Redirect to the music library
});

// Server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
