# Mimari Kararlar

## ADR-001: Expo + React Native + Expo Router

**Karar:** iOS, Android ve responsive web'i aynı kod tabanında desteklemek için Expo ve Expo Router kullanılacak.

**Gerekçe:** Hedef platformlar aynı; route group'ları auth/app ayrımını sadeleştirir ve native/web navigation'ı ortaklaştırır.

## ADR-002: Supabase backend

**Karar:** Auth, PostgreSQL, Storage ve gerekli Edge Functions Supabase üzerinde tutulacak.

**Gerekçe:** Ürünün veri modeli ilişkisel; RLS kullanıcı izolasyonunu veritabanı seviyesinde sağlar. İlk sürüm için ayrı API sunucusu ve mikroservis işletmek gereksizdir.

## ADR-003: Modüler monolith

**Karar:** Özellikler `src/modules` altında modüler olarak ayrılacak; gerçek mikroservis kurulmayacak.

**Gerekçe:** Tek kullanıcılı başlayan ürün için operasyonel karmaşıklık düşük tutulurken ileride kullanıcı sayısı artışına uygun sınırlar korunur.

## ADR-004: TanStack Query server state için

**Karar:** Supabase verisi TanStack Query ile cache, loading, invalidation ve retry üzerinden yönetilecek.

**Gerekçe:** Server state ile UI state birbirinden ayrılır. Zustand yalnızca gerçekten ekranlar arası istemci state'i gerektiğinde kullanılacak.

## ADR-005: Zod + React Hook Form

**Karar:** Form input'ları React Hook Form, schema doğrulaması Zod ile yapılacak.

**Gerekçe:** Tek bir doğrulama sözleşmesi UI ve API sınırında tekrar kullanılabilir; controlled input maliyeti azaltılır.

## ADR-006: Merkezi design system

**Karar:** Button, Input, Card, Modal, ErrorState, EmptyState ve Screen gibi temel component'ler tek merkezde tutulacak.

**Gerekçe:** Mobil, tablet ve desktop görsel tutarlılığı; erişilebilirlik ve safe-area davranışının tek yerde düzeltilebilmesi.

## ADR-007: Tam offline-first başlangıç kapsamı dışında

**Karar:** İlk sürüm cache ve draft koruması sağlar; tam offline mutation queue daha sonraki ayrı bir çalışma olacaktır.

**Gerekçe:** Offline queue; conflict resolution, idempotency ve kalıcı senkronizasyon gerektirir. Küçük problem için doğrulanmamış büyük mimari kurulmayacak.

## ADR-008: Story üretimi önce cihaz paylaşımı

**Karar:** İlk sürüm görseli üretip Storage'a kaydeder ve sistem paylaşım/kayıt ekranını açar; otomatik Instagram API paylaşımı yapılmaz.

**Gerekçe:** OAuth token güvenliği ve platform/Instagram API kısıtları ilk sürümün temel günlük takip değerinden ayrıdır.

## ADR-009: Hesap silme Edge Function

**Karar:** Storage temizliği ve auth kullanıcısı silme orchestration'ı server-side yapılacak.

**Gerekçe:** `service_role` client'a verilemez; işlem idempotent, kontrollü ve audit edilebilir olmalıdır.

## ADR-010: Dependency ekleme politikası

**Karar:** Yeni dependency yalnızca platform ihtiyacını veya belirgin bakım maliyetini gerekçelendiriyorsa eklenecek.

**Planlanan temel paketler:** Expo/React Native/Expo Router, Supabase JS, TanStack Query, Zod, React Hook Form ve güvenilir bir test stack'i.

**Kaçınılacaklar:** Aynı problemi çözen ikinci form/state/query kütüphanesi, gereksiz UI kitleri, ağır grafik ve animasyon paketleri.

## ADR-011: İlk aşamada gerçek veri ve migration yok

**Karar:** Bu commit yalnızca repository incelemesi ve plan belgelerini içerir; özellik veya migration kodu içermez.

**Gerekçe:** Kullanıcının talimatı gereği kodlamaya başlamadan önce mimari özet ve onay alınmalıdır. Aşama 1, kullanıcı onayından sonra başlatılacaktır.
