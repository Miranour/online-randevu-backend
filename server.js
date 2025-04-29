const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { sequelize } = require('./models');

// Route'ları import et
const authRoutes = require('./routes/auth');
const appointmentRoutes = require('./routes/appointments');

dotenv.config();

const app = express();

// CORS ayarları
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Route'ları kullan
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);

// Ana route
app.get('/', (req, res) => {
    res.json({ message: 'Online Randevu Sistemi API' });
});

// Veritabanı bağlantısı ve sunucu başlatma
const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true })
    .then(() => {
        console.log('Veritabanı bağlantısı başarılı');
        app.listen(PORT, () => {
            console.log(`Sunucu ${PORT} portunda çalışıyor`);
        });
    })
    .catch(err => {
        console.error('Veritabanı bağlantı hatası:', err);
    }); 