// models/userModel.js

const db = require('../models/db'); // Sesuaikan dengan lokasi file koneksi database

const User = {
  // Fungsi untuk menemukan pengguna berdasarkan email
  findByEmail: (email, callback) => {
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, results[0]); // Mengembalikan hasil pertama jika ada
    });
  },

  // Fungsi untuk membuat pengguna baru
  create: (name, email, password, callback) => {
    db.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, password],
      (err, results) => {
        if (err) {
          callback(err, null);
          return;
        }
        callback(null, results);
      }
    );
  }
};

module.exports = User;
