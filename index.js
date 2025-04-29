const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/favorites', require('./routes/favoriteRoutes'));
app.use('/api/plans', require('./routes/planRoutes'));

app.listen(3000, () => console.log('Server berjalan di http://localhost:3000'));
