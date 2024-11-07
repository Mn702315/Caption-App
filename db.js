const sqlite3 = require('sqlite3').verbose();
const path = require('path'); // Add this line
const db = new sqlite3.Database(path.join(__dirname, 'database', 'db.sqlite'), (err) => {
  if (err) {
    console.error('Error opening database ' + err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Create tables if they do not exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS videos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      filename TEXT,
      filepath TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS lyrics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      video_id INTEGER,
      lyric_text TEXT,
      timestamp REAL,
      FOREIGN KEY(video_id) REFERENCES videos(id)
    )
  `);
});

module.exports = db;
