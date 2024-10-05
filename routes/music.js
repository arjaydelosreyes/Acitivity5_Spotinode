const express = require('express');
const router = express.Router();
const multer = require('multer');
const Song = require('../models/song'); // Adjust the path as necessary

// Set up multer for file uploads
const upload = multer({ dest: 'public/audio/' }); // Specify where to store files

// Show the music library
router.get('/', async (req, res) => {
    try {
        const songs = await Song.getAllSongs(); // Retrieve all songs
        res.render('library', { songs }); // Render the library view
    } catch (err) {
        console.error('Error fetching songs:', err);
        res.status(500).send('Server Error');
    }
});

// Add a new song (POST route) with multer
router.post('/add', upload.single('file'), async (req, res) => {
    const { title, artist } = req.body; // Get title and artist from form
    const filePath = `/audio/${req.file.filename}`; // Store path for the file

    try {
        await Song.addSong(title, artist, filePath); // Use your model's method to add the song
        res.redirect('/music'); // Redirect to the music library after adding
    } catch (err) {
        console.error('Error adding song:', err);
        res.status(500).send('Server Error'); // Handle any errors
    }
});

// Add this DELETE route in music.js
router.post('/delete/:id', async (req, res) => {
    const songId = req.params.id; // Get the song ID from the request parameters

    try {
        await Song.deleteSong(songId); // Use your model's method to delete the song
        res.redirect('/music'); // Redirect to the music library after deleting
    } catch (err) {
        console.error('Error deleting song:', err);
        res.status(500).send('Server Error'); // Handle any errors
    }
});

// Search songs (GET route)
router.get('/search', async (req, res) => {
    const query = req.query.query; // Get the search query
    try {
        const songs = await Song.searchSongs(query); // Use the searchSongs method in your Song model
        res.render('library', { songs }); // Render the library view with filtered songs
    } catch (err) {
        console.error('Error searching songs:', err);
        res.status(500).send('Server Error'); // Handle any errors
    }
});



module.exports = router;
