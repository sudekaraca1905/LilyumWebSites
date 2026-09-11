# Lilyum Baskı Atölyesi

Okul atölyeleri ve 3D baskı ürünleri için statik web sitesi + admin paneli. Next.js (`output: "export"`) ile statik HTML üretir, veriler Firebase (Firestore + Auth + Storage) üzerinde tutulur, GitHub Pages'te barınır.

## Kurulum

1. Firebase projesi oluşturun (Firestore, Authentication → Email/Password, Storage açık olmalı).
2. `.env.example` dosyasını `.env` olarak kopyalayıp Firebase Console > Project settings > Web app config değerlerini girin.
3. Firestore'da `admins/{sizin-uid'niz}` dokümanı oluşturun (admin yetkisi bunun üzerinden kontrol edilir).
4. `firestore.rules` ve `storage.rules` içeriğini Firebase Console'daki ilgili kurallara yapıştırın.
5. (Opsiyonel) örnek atölye verisini yüklemek için Firebase Console'dan bir servis hesabı anahtarı indirip proje köküne `serviceAccountKey.json` olarak kaydedin, sonra:

```bash
npm install
npm run db:seed
```

6. Geliştirme sunucusu:

```bash
npm run dev
```

Site: http://localhost:3000
Admin: http://localhost:3000/admin (Firebase Authentication'da oluşturduğunuz e-posta/şifre ile giriş yapılır)

## Statik build ve deploy

```bash
npm run build
```

çıktısı `out/` klasörüne yazılır. `main` branch'e her push'ta `.github/workflows/deploy.yml` bunu otomatik build edip GitHub Pages'e yayınlar (repo Settings → Pages → Source: GitHub Actions olmalı, Firebase config değerleri repo Secrets'a eklenmeli).

## Ne yönetilir?

- Ürün ekleme / düzenleme / silme (görsel yükleme destekli, Firebase Storage)
- Atölye ekleme / düzenleme / yayınlama
- İletişim formu mesajları

Not: Ürün/atölye içerikleri build anında (statik export sırasında) Firestore'dan çekilir. Admin panelden yapılan bir değişikliğin canlı sitede görünmesi için ya "Değişiklikleri Yayınla" butonuyla GitHub Actions'ı elle tetiklemeniz, ya da otomatik zamanlanmış rebuild'i (6 saatte bir) beklemeniz gerekir.
