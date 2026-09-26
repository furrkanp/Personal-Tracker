# Mimari

## Mevcut durum

Repository, 26 Eylül 2026 itibarıyla yalnızca `README.md` içeren boş bir başlangıç repository'sidir. Expo, React Native, TypeScript, Supabase, test, lint veya build yapılandırması henüz bulunmamaktadır.

## Hedef mimari

Uygulama, ilk sürümde modüler monolith yaklaşımıyla Expo üzerinde çalışacaktır:

```text
Expo Router uygulaması
        |
        +-- Feature modules
        |     +-- auth
        |     +-- profile
        |     +-- daily-log
        |     +-- tasks
        |     +-- meals
        |     +-- workouts
        |     +-- analytics
        |     +-- mascot
        |     +-- stories
        |
        +-- Shared design system, validation ve yardımcılar
        |
        +-- Infrastructure
              +-- Supabase Auth
              +-- PostgreSQL
              +-- Storage
              +-- Edge Functions
              +-- TanStack Query cache
```

## Önerilen klasör yapısı

```text
app/
  (auth)/                 Auth route group
  (app)/                  Oturum açılmış kullanıcı route group
src/
  modules/                Özellik bazlı API, validation ve UI
  shared/                 Ortak component, tip, tema ve yardımcılar
  infrastructure/        Supabase, storage, paylaşım ve bildirim adaptörleri
supabase/
  migrations/             Sürüm kontrollü SQL migration'ları
  functions/              Server-side işlemler
  seed/                   Yalnızca geliştirme/test seed'leri
  config.toml             Supabase yerel yapılandırması
__tests__/                Unit ve integration testleri
e2e/                      E2E senaryoları
docs/                     Mimari ve karar belgeleri
```

## Modül sınırları

Her modül kendi public API fonksiyonlarını, Zod şemalarını ve ekranlarına yakın UI bileşenlerini barındırır. UI veya başka bir modül, Supabase tablolarına doğrudan erişmek yerine ilgili modülün repository/service fonksiyonunu kullanır. Ortak veri modelleri `src/shared/types` altında tutulur; özellik davranışları shared katmana taşınmaz.

## Veri akışı

1. Route ekranı TanStack Query hook'unu çağırır.
2. Hook, ilgili modülün API fonksiyonunu çağırır.
3. API fonksiyonu Zod ile input doğrular ve Supabase sorgusunu çalıştırır.
4. PostgreSQL RLS, ikinci güvenlik katmanı olarak `auth.uid()` ile kullanıcı sahipliğini doğrular.
5. Başarılı mutation sonrasında ilgili query'ler invalidate edilir; optimistic update yalnızca güvenli rollback tanımı varsa kullanılır.

## İlk sürüm mimari kararları

- Gerçek mikroservis yok; Supabase servisleri etrafında modüler monolith.
- Hesap silme, dosya temizleme ve yeniden authentication gerektiren işlemler Edge Function üzerinden yürütülecek.
- Raporlama sorguları mümkün olduğunca PostgreSQL RPC/view veya Edge Function tarafında toplu hesaplanacak.
- Hassas storage bucket'ları private olacak; istemciye kısa ömürlü signed URL verilecek.
- Offline desteği önce cache ve form verisini koruma seviyesinde uygulanacak; tam offline-first senkronizasyon başlangıç kapsamına alınmayacak.

## Uygulama sırası

1. Proje iskeleti ve tasarım sistemi
2. Auth ve hesap yönetimi
3. Onboarding ve profil
4. Günlük log
5. Görevler
6. Yemekler
7. Spor
8. Takvim
9. Analytics
10. Maskot
11. Story üretimi
12. Bildirimler

Her aşama için gereksinim, migration/backend, UI, responsive kontrolü ve testler tamamlanmadan sonraki aşamaya geçilmeyecek.
