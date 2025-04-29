# Online Randevu Sistemi

Bu proje, kullanıcıların çevrimiçi olarak randevu almasını sağlayan bir platform sunmaktadır. Sistem, sağlık hizmetleri, güzellik salonları, danışmanlık, eğitim ve diğer birçok sektörde kullanılabilir.

## Özellikler

- Kullanıcı kaydı ve girişi
- Randevu oluşturma, görüntüleme, güncelleme ve silme
- Hizmet sağlayıcı yönetimi
- Randevu durumu takibi
- Güvenli kimlik doğrulama

## Kurulum

1. Projeyi klonlayın:
```bash
git clone [repo-url]
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. PostgreSQL veritabanını kurun ve çalıştırın

4. `.env` dosyasını oluşturun ve gerekli değişkenleri ayarlayın:
```
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=randevu_sistemi
DB_USER=your_db_user
DB_PASSWORD=your_db_password
JWT_SECRET=your_jwt_secret_key
```

5. Uygulamayı başlatın:
```bash
npm start
```

## API Endpoints

### Kimlik Doğrulama
- POST /api/auth/register - Yeni kullanıcı kaydı
- POST /api/auth/login - Kullanıcı girişi

### Randevular
- POST /api/appointments - Yeni randevu oluşturma
- GET /api/appointments/my-appointments - Kullanıcının randevularını listeleme
- GET /api/appointments/provider-appointments - Hizmet sağlayıcının randevularını listeleme
- PATCH /api/appointments/:id - Randevu güncelleme
- DELETE /api/appointments/:id - Randevu silme

## Teknolojiler

- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- JWT Authentication
- Bcrypt

## Lisans

MIT 