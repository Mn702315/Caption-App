const express = require('express');
const router = express.Router();
const db = require('../db'); // Ensure this file exists and handles database connections

// Route to handle syncing lyrics
router.post('/sync-lyrics', (req, res) => {
  const { videoId, lyrics } = req.body;

  // Check if videoId and lyrics are provided
  if (!videoId || !Array.isArray(lyrics)) {
    return res.status(400).json({ message: 'videoId and lyrics are required' });
  }

  const sql = 'INSERT INTO lyrics (video_id, lyric_text, timestamp) VALUES (?, ?, ?)';
  const stmt = db.prepare(sql);

  // Insert each lyric with its timestamp into the database
  lyrics.forEach(({ text, time }) => {
    stmt.run([videoId, text, time]);
  });

  stmt.finalize((err) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to save lyrics', error: err });
    }
    res.status(200).json({ message: 'Lyrics synced successfully' });
  });
});

// Route to retrieve lyrics for a specific video
router.get('/lyrics/:videoId', (req, res) => {
  const { videoId } = req.params;

  const sql = 'SELECT * FROM lyrics WHERE video_id = ? ORDER BY timestamp';
  db.all(sql, [videoId], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to retrieve lyrics', error: err });
    }
    res.status(200).json(rows);
  });
});

module.exports = router;
