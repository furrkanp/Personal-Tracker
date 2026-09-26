# Veritabanı Şeması

## Genel kurallar

- PostgreSQL şeması Supabase migration dosyalarıyla sürümlendirilecek.
- Tüm kullanıcıya ait tablolarda `user_id uuid not null references auth.users(id) on delete cascade` bulunacak.
- Tarih alanları kullanıcı timezone'u ile yorumlanacak; sunucu zamanları `timestamptz` olarak saklanacak.
- `created_at` ve `updated_at` alanları `timestamptz not null default now()` olacak.
- `updated_at` için ortak trigger kullanılacak; istemcinin zamanı güvenlik veya tutarlılık açısından esas alınmayacak.

## Çekirdek tablolar

### Kimlik ve profil

- `profiles`: kullanıcı adı, avatar yolu, biyografi, doğum tarihi, ölçümler, timezone ve locale.
- `user_settings`: tema, haftanın başlangıcı, gün başlangıç saati ve bildirim tercihi.

`profiles.id` ve `user_settings.user_id`, `auth.users(id)` ile bire bir ilişkilidir.

### Günlük yaşam kayıtları

- `daily_logs`: kullanıcı ve tarih başına tek günlük özet; `unique(user_id, log_date)`.
- `daily_notes`: günlük log'a bağlı, kullanıcıya ait serbest notlar.
- `tasks`: görevler, tarih/saat, öncelik, durum ve basit tekrar kuralı.
- `meals`: yemek kaydı, besin değerleri, fotoğraf yolu ve puan.
- `workouts`: antrenman başlığı, türü, tarihi, süresi ve notu.

### Antrenman ilişkileri

```text
exercises 1 --- * workout_exercises 1 --- * workout_sets
workouts  1 --- * workout_exercises
```

`exercises` kullanıcıya özel hareketleri ve ileride paylaşılabilecek sistem hareketlerini destekler. `workout_exercises.exercise_id` silme davranışı `restrict` olmalıdır; böylece geçmiş antrenman kayıtları bozulmaz.

### Türetilmiş metrikler

- `daily_metrics`: kullanıcı ve tarih başına toplu metrik snapshot'ı.
- Kaynak kayıt değişince ilgili günün metric'i idempotent bir upsert ile yeniden hesaplanır.
- Metrik tablosu gerçek kaynağın yerine geçmez; analytics hızlandırma katmanıdır.

## Kısıtlar ve doğrulama

Veritabanı kısıtları, istemci doğrulamasının yerine geçmez:

- Skorlar tanımlı aralıkta `check` constraint ile sınırlandırılmalı.
- `duration_minutes`, `repetitions`, `weight`, `distance` negatif olamamalı.
- Durum, öncelik, öğün tipi ve not tipi için kontrollü değerler kullanılmalı; tercihen PostgreSQL enum yerine migration ile yönetilen text + check constraint yaklaşımı seçilmeli.
- `daily_logs` için kullanıcı/tarih unique constraint'i duplicate kaydı engelleyecek.
- `workout_sets` için ilgili hareket içinde `set_number` unique olmalı.
- Username normalleştirilmiş ve unique olmalı.

## İlişki ve silme yaklaşımı

- Kullanıcı silinince kullanıcıya ait tüm kayıtlar cascade ile silinir.
- `daily_notes`, `workout_exercises` ve `workout_sets` üst kaydına cascade bağlıdır.
- Storage dosyaları veritabanı cascade'i tarafından otomatik silinmez; hesap silme Edge Function'ı önce dosyaları temizler, sonra kullanıcı verisini siler.
- Sistem tarafından sağlanan exercise kayıtları için `user_id` null olabilir; kullanıcı özel kayıtlar `user_id` ile korunur.

## Migration sırası

1. Extensions ve ortak trigger fonksiyonları
2. `profiles`, `user_settings`
3. `daily_logs`, `daily_notes`, `tasks`, `meals`
4. `workouts`, `exercises`, `workout_exercises`, `workout_sets`
5. `daily_metrics`
6. Index'ler, RLS ve policy'ler
7. Metrik hesaplama RPC/trigger'ları

## Önerilen index'ler

- Kullanıcı + tarih: `daily_logs(user_id, log_date)`, `tasks(user_id, task_date)`, `meals(user_id, meal_date)`, `workouts(user_id, workout_date)`, `daily_metrics(user_id, metric_date)`.
- İlişkisel sorgular: `daily_notes(daily_log_id)`, `workout_exercises(workout_id)`, `workout_sets(workout_exercise_id)`.
- `due_at` filtreleri için ihtiyaç oluştuğunda bileşik index eklenir.

## Henüz oluşturulmayan unsurlar

Bu aşamada migration dosyası, tablo veya RPC oluşturulmadı. Bu belge yalnızca onay bekleyen şema planıdır; Aşama 1 onayından sonra gerçek migration'lar yazılacaktır.
