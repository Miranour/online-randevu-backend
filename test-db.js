const { sequelize } = require('./models');

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Veritabanı bağlantısı başarılı!');
        
        // Tabloları senkronize et
        await sequelize.sync({ force: true });
        console.log('Tablolar başarıyla yeniden oluşturuldu!');
        
        process.exit(0);
    } catch (error) {
        console.error('Veritabanı bağlantı hatası:', error);
        process.exit(1);
    }
}

testConnection(); 