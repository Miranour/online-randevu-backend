const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// Middleware - Token doğrulama
const auth = require('../middleware/auth');

// Yeni randevu oluşturma
router.post('/', auth, async (req, res) => {
    try {
        const appointment = new Appointment({
            ...req.body,
            user: req.user.userId
        });

        await appointment.save();
        res.status(201).json(appointment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Kullanıcının randevularını listeleme
router.get('/my-appointments', auth, async (req, res) => {
    try {
        const appointments = await Appointment.find({ user: req.user.userId })
            .populate('serviceProvider', 'name email')
            .sort({ date: 1 });
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Hizmet sağlayıcının randevularını listeleme
router.get('/provider-appointments', auth, async (req, res) => {
    try {
        const appointments = await Appointment.find({ serviceProvider: req.user.userId })
            .populate('user', 'name email')
            .sort({ date: 1 });
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Randevu güncelleme
router.patch('/:id', auth, async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        
        if (!appointment) {
            return res.status(404).json({ message: 'Randevu bulunamadı' });
        }

        // Sadece randevu sahibi veya hizmet sağlayıcı güncelleyebilir
        if (appointment.user.toString() !== req.user.userId && 
            appointment.serviceProvider.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Bu işlem için yetkiniz yok' });
        }

        Object.assign(appointment, req.body);
        await appointment.save();
        res.json(appointment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Randevu silme
router.delete('/:id', auth, async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        
        if (!appointment) {
            return res.status(404).json({ message: 'Randevu bulunamadı' });
        }

        // Sadece randevu sahibi veya hizmet sağlayıcı silebilir
        if (appointment.user.toString() !== req.user.userId && 
            appointment.serviceProvider.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Bu işlem için yetkiniz yok' });
        }

        await appointment.remove();
        res.json({ message: 'Randevu başarıyla silindi' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 