const db = require('../models/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = (req, res) => {
  const { name, email, password } = req.body;
  const hash = bcrypt.hashSync(password, 10);

  db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, hash],
    (err, result) => {
      if (err) return res.status(400).json({ error: 'Email mungkin sudah digunakan.' });
      res.status(201).json({ message: 'Registrasi berhasil' });
    });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err || results.length === 0) return res.status(401).json({ error: 'Email tidak ditemukan' });

    const user = results[0];
    const isValid = bcrypt.compareSync(password, user.password);

    if (!isValid) return res.status(401).json({ error: 'Password salah' });

    const token = jwt.sign({ id: user.id, email: user.email }, 'secretKey', { expiresIn: '1d' });
    res.json({ message: 'Login berhasil', token });
  });
};
