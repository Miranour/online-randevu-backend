const { sequelize } = require('./models');

async function checkTables() {
    try {
        // Tüm tabloları listele
        const [tables] = await sequelize.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        `);
        console.log('Mevcut Tablolar:');
        console.log(tables);

        // Her tablonun sütunlarını listele
        for (const table of tables) {
            const tableName = table.table_name;
            const [columns] = await sequelize.query(`
                SELECT column_name, data_type, is_nullable
                FROM information_schema.columns
                WHERE table_schema = 'public'
                AND table_name = '${tableName}'
            `);
            console.log(`\n${tableName} tablosunun sütunları:`);
            console.log(columns);
        }

        process.exit(0);
    } catch (error) {
        console.error('Hata:', error);
        process.exit(1);
    }
}

checkTables(); 