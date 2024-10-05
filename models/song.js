const db = require('../db'); // Ensure this is your db connection

// Get all songs from the database
// Get all songs from the database with optional search term
const getAllSongs = (searchTerm = '') => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM songs WHERE title LIKE ? OR artist LIKE ?`;
        const searchQuery = `%${searchTerm}%`; // Use wildcard for searching
        db.query(sql, [searchQuery, searchQuery], (err, results) => {
            if (err) {
                console.error('Database query error:', err);
                return reject(err);
            }
            resolve(results);
        });
    });
};


// Add a new song to the database
const addSong = (title, artist, filePath) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO songs (title, artist, file_path) VALUES (?, ?, ?)';
        console.log('Executing SQL:', sql, [title, artist, filePath]); // Log the SQL query and parameters
        db.query(sql, [title, artist, filePath], (err, result) => {
            if (err) {
                console.error('Error executing SQL:', err);
                return reject(err);
            }
            resolve(result);
        });
    });
};

// Add this method in song.js
const deleteSong = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM songs WHERE id = ?';
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error executing SQL:', err);
                return reject(err);
            }
            resolve(result);
        });
    });
};

// Search songs in the database
const searchSongs = (query) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM songs WHERE title LIKE ? OR artist LIKE ?';
        db.query(sql, [`%${query}%`, `%${query}%`], (err, results) => {
            if (err) {
                console.error('Error executing SQL:', err);
                return reject(err);
            }
            resolve(results);
        });
    });
};

module.exports = { getAllSongs, addSong, deleteSong, searchSongs }; // Ensure this function is exported


