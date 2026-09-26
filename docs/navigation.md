# Navigation

## Route grupları

```text
app/
├── _layout.tsx                 Root providers, session gate, theme
├── (auth)/
│   ├── _layout.tsx
│   ├── login.tsx
│   ├── register.tsx
│   └── forgot-password.tsx
└── (app)/
    ├── _layout.tsx             Responsive shell ve tab/sidebar navigation
    ├── home.tsx
    ├── calendar.tsx
    ├── tasks.tsx
    ├── meals.tsx
    ├── workouts.tsx
    ├── analytics.tsx
    ├── profile.tsx
    └── settings/
        ├── account.tsx
        ├── appearance.tsx
        └── notifications.tsx
```

## Auth gate

Root layout session durumunu izler. Session yoksa `(auth)` grubuna, geçerli session varsa `(app)` grubuna yönlendirir. Session restore sırasında uzun süreli veya kullanıcıyı bekleten splash ekranı yerine minimal loading state gösterilir.

## Platform davranışı

- Mobilde ana navigasyon alt tab bar.
- Tablet portrait'te alt tab veya dar sidebar; landscape'te sidebar + içerik.
- Desktop web'de sabit sol navigation, ortada sınırlı genişlikte içerik ve ihtiyaç olan ekranlarda sağ özet paneli.
- Modal gerektiren destructive işlemler native modal/web dialog ile erişilebilir biçimde gösterilir.
- Detay sayfaları stack içinde açılır; geri davranışı web browser history ile uyumlu kalır.

## Ana ekranlar

- `home`: seçili günün özeti, hızlı kayıtlar ve önemli görevler.
- `calendar`: tarih seçimi ve kayıt yoğunlukları.
- `tasks`, `meals`, `workouts`: ilgili modülün tarih filtreli listesi ve create action'ı.
- `analytics`: gün/hafta/ay/yıl aralığı seçimi ve gerçek metrikler.
- `profile`: profil ve hesap ayarları.

## Navigation kuralları

- Derin linkler session ve yetki kontrolünden geçer.
- Silme veya hesap devre dışı bırakma sonrasında geri stack'i temizlenir.
- Formdan çıkışta kaydedilmemiş değişiklik varsa kullanıcı uyarılır.
- Tab değişiminde yazılmakta olan form verisi kaybedilmez; ekran state'i veya draft stratejisi açıkça seçilir.
