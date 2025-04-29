const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { sequelize } = require('./models');
const cron = require('node-cron');
const axios = require('axios');

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

// Health check endpoint'i
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Ana route
app.get('/', (req, res) => {
    res.json({ message: 'Online Randevu Sistemi API' });
});

// Veritabanı bağlantısı ve sunucu başlatma
const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true })
    .then(() => {
        console.log('Veritabanı bağlantısı başarılı');
        const server = app.listen(PORT, () => {
            console.log(`Sunucu ${PORT} portunda çalışıyor`);
            
            // Her 5 dakikada bir self-ping
            if (process.env.NODE_ENV === 'production') {
                const appUrl = process.env.APP_URL || `http://localhost:${PORT}`;
                cron.schedule('*/5 * * * *', async () => {
                    try {
                        await axios.get(`${appUrl}/health`);
                        console.log('Self-ping başarılı:', new Date().toISOString());
                    } catch (error) {
                        console.error('Self-ping hatası:', error.message);
                    }
                });
            }
        });
    })
    .catch(err => {
        console.error('Veritabanı bağlantı hatası:', err);
    }); 