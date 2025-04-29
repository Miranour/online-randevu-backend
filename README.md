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

3. `.env` dosyasını oluşturun ve gerekli değişkenleri ayarlayın:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/randevu-sistemi
JWT_SECRET=your_jwt_secret_key
```

4.posgresql' başlatın

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
- postgresql
- JWT Authentication
- Bcrypt

## Lisans

MIT 
