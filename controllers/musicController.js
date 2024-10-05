const Song = require('../models/song');
const path = require('path');

// Fetch and display songs
// Fetch and display songs with optional search
exports.showLibrary = (req, res) => {
  const searchTerm = req.query.search || ''; // Get search term from query
  Song.getAllSongs(searchTerm)
      .then((songs) => {
          res.render('library', { songs, searchTerm }); // Pass searchTerm for input retention
      })
      .catch((err) => {
          console.error('Error fetching songs:', err);
          res.status(500).send('Server Error');
      });
};


// Add new song
exports.addSong = (req, res) => {
  const { title, artist } = req.body;
  const filePath = `/audio/${req.file.filename}`;
  Song.addSong({ title, artist, file_path: filePath }, (err) => {
    if (err) throw err;
    res.redirect('/music');
  });
};
