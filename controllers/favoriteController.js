const db = require('../models/db');

exports.getFavorites = (req, res) => {
  const userId = req.user.id;
  db.query(
    `SELECT f.id, d.name, d.category, d.location 
     FROM favorites f 
     JOIN destinations d ON f.destination_id = d.id 
     WHERE f.user_id = ?`,
    [userId],
    (err, results) => {
      if (err) return res.status(500).json({ error: 'Gagal ambil data' });
      res.json(results);
    }
  );
};
