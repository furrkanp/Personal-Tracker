# Personal Tracker

Kişisel günlük yaşam takip uygulaması. Proje şu anda **Aşama 1 — proje iskeleti** kapsamındadır.

## Stack

- Expo + React Native + Expo Router
- TypeScript strict mode
- Supabase client altyapısı
- TanStack Query provider
- React Native Safe Area Context
- Jest Expo test altyapısı

## Kurulum

```bash
npm install
cp .env.example .env
npm run start
```

`.env` içinde `EXPO_PUBLIC_SUPABASE_URL` ve `EXPO_PUBLIC_SUPABASE_ANON_KEY` değerlerini tanımlayın. `service_role` anahtarını client'a koymayın.

Supabase değerleri boş bırakılırsa uygulama kabuğu açılabilir; Supabase kullanan bir işlem çağrıldığında anlaşılır bir yapılandırma hatası verilir.

## Komutlar

```bash
npm run start
npm run web
npm run android
npm run ios
npm run typecheck
npm run lint
npm run format:check
npm test
```

## Mevcut kapsam

Bu aşamada route shell'i, tema, responsive breakpoint altyapısı, safe area, temel design-system component'leri, hata sınırı, Supabase client tanımı ve kalite komutları oluşturulmuştur. Auth, veritabanı migration'ları ve günlük yaşam özellikleri henüz uygulanmamıştır.

Bu committe gerçek kullanıcı, sahte business verisi, Supabase migration'ı veya authentication akışı yoktur. Native cihaz build'leri ve dependency kurulumu yerel Expo ortamında doğrulanmalıdır. Aşama 2'ye geçmeden önce Aşama 1 test sonuçları incelenmeli ve kullanıcı onayı alınmalıdır.
