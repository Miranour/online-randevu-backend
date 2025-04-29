const { User, Appointment } = require('../models');
const { sequelize } = require('../models');

async function seedDatabase() {
    try {
        // Veritabanını temizle
        await sequelize.sync({ force: true });
        console.log('Veritabanı temizlendi');

        // Hizmet sağlayıcı oluştur
        const serviceProvider = await User.create({
            name: 'Dr. Ahmet Yılmaz',
            email: 'dr.ahmet@example.com',
            password: 'password123',
            phone: '5551234567',
            address: 'Atatürk Caddesi No:123, Kadıköy/İstanbul',
            role: 'service_provider'
        });
        console.log('Hizmet sağlayıcı oluşturuldu');

        // Normal kullanıcı oluştur
        const user = await User.create({
            name: 'Ayşe Demir',
            email: 'ayse@example.com',
            password: 'password123',
            phone: '5559876543',
            address: 'Cumhuriyet Mahallesi, Bağdat Caddesi No:45, Maltepe/İstanbul',
            role: 'user'
        });
        console.log('Kullanıcı oluşturuldu');

        // Admin kullanıcı oluştur
        const admin = await User.create({
            name: 'Admin User',
            email: 'admin@example.com',
            password: 'admin123',
            phone: '5551112233',
            address: 'Merkez Ofis, Levent/İstanbul',
            role: 'admin'
        });
        console.log('Admin oluşturuldu');

        // Randevular oluştur
        const appointments = await Appointment.bulkCreate([
            {
                userId: user.id,
                serviceProviderId: serviceProvider.id,
                serviceType: 'Genel Kontrol',
                date: '2024-03-20',
                startTime: '09:00',
                endTime: '09:30',
                status: 'confirmed',
                notes: 'İlk randevu'
            },
            {
                userId: user.id,
                serviceProviderId: serviceProvider.id,
                serviceType: 'Kontrol',
                date: '2024-03-21',
                startTime: '14:00',
                endTime: '14:30',
                status: 'pending',
                notes: 'Takip randevusu'
            },
            {
                userId: user.id,
                serviceProviderId: serviceProvider.id,
                serviceType: 'Danışma',
                date: '2024-03-22',
                startTime: '11:00',
                endTime: '11:30',
                status: 'pending',
                notes: 'Genel danışma'
            }
        ]);
        console.log('Randevular oluşturuldu');

        console.log('Test verileri başarıyla eklendi!');
        process.exit(0);
    } catch (error) {
        console.error('Hata:', error);
        process.exit(1);
    }
}

seedDatabase(); 