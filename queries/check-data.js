const { User, Appointment } = require('../models');

async function checkData() {
    try {
        // Tüm kullanıcıları listele
        const users = await User.findAll({
            attributes: ['id', 'name', 'email', 'phone', 'address', 'role']  // Şifreyi gösterme
        });
        console.log('\nKullanıcılar:');
        console.log(JSON.stringify(users, null, 2));

        // Tüm randevuları kullanıcı ve hizmet sağlayıcı bilgileriyle listele
        const appointments = await Appointment.findAll({
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['name', 'email', 'phone', 'address']
                },
                {
                    model: User,
                    as: 'serviceProvider',
                    attributes: ['name', 'email', 'phone', 'address']
                }
            ]
        });
        console.log('\nRandevular:');
        console.log(JSON.stringify(appointments, null, 2));

        process.exit(0);
    } catch (error) {
        console.error('Hata:', error);
        process.exit(1);
    }
}

checkData(); 