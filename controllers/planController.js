const db = require('../models/db');

exports.getPlans = (req, res) => {
  const userId = req.user.id;
  db.query(
    `SELECT p.id, p.title, p.date, pd.sort_order, d.name AS destination
     FROM plans p
     JOIN plan_details pd ON pd.plan_id = p.id
     JOIN destinations d ON d.id = pd.destination_id
     WHERE p.user_id = ?
     ORDER BY p.date, pd.sort_order`,
    [userId],
    (err, results) => {
      if (err) return res.status(500).json({ error: 'Gagal ambil data rencana' });
      res.json(results);
    }
  );
};
