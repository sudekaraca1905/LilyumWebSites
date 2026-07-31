# Lilyum Baskı Atölyesi

Okul atölyeleri ve 3D baskı ürünleri için web sitesi + admin paneli.

## Kurulum

```bash
npm install
npx prisma db push
npm run db:seed
npm run dev
```

Site: http://localhost:3000  
Admin: http://localhost:3000/admin

### Admin giriş

- Kullanıcı: `admin`
- Şifre: `lilyum2026`

`.env` dosyasından değiştirebilirsiniz.

## Ne yönetilir?

- Ürün ekleme / düzenleme / silme (görsel yükleme destekli)
- Atölye ekleme / düzenleme / yayınlama
- İletişim formu mesajları
