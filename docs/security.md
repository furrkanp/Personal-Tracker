# Güvenlik

## Kimlik doğrulama

- İstemci yalnızca Supabase anon key kullanır.
- `service_role` anahtarı hiçbir mobil/web bundle'ına konulmaz.
- Oturum kontrolü Expo Router auth group seviyesinde yapılır.
- Şifre sıfırlama ve session expired durumları kullanıcıya genel, anlaşılır mesajlarla gösterilir.
- Yeniden authentication gerektiren işlemler, özellikle hesap silme, işlem öncesinde açıkça başlatılır.

## RLS

Tüm kullanıcı tablolarında RLS aktif olacak. Kullanıcıya ait kayıtlar için temel policy şekli:

```sql
using (user_id = auth.uid())
with check (user_id = auth.uid())
```

`profiles` için sahiplik alanı `id`, `user_settings` için `user_id` olacaktır. `workout_exercises` ve `workout_sets` gibi doğrudan `user_id` taşımayan alt tablolar için policy, ilişkili üst kaydın kullanıcısına göre `exists` sorgusuyla uygulanacaktır.

Her tablo için select, insert, update ve delete policy'leri ayrı ve açık yazılacak. RLS yalnızca istemci filtresi olarak değil, veritabanı güvenlik sınırı olarak kabul edilecek.

## Storage

- Varsayılan bucket'lar private.
- Avatar, meal photo ve story output yolları kullanıcı prefix'i altında tutulur: `<user_id>/...`.
- Upload öncesinde MIME type, dosya boyutu ve mümkünse görsel boyutları doğrulanır.
- Okuma için kısa süreli signed URL kullanılır.
- Dosya yolu kullanıcı girdisinden doğrudan oluşturulmaz; güvenli UUID/allowlist tabanlı isim üretilir.
- Eski avatar, yeni dosya başarıyla doğrulandıktan sonra silinir; upload başarısızsa eski avatar korunur.

## Edge Functions

Aşağıdaki işlemler server-side yapılmalıdır:

- Hesap silme orchestration'ı
- Storage dosyalarını toplu silme
- Yeniden authentication sonrası hassas hesap işlemleri
- İleride sosyal entegrasyon token işlemleri
- Gerekirse ağır analytics raporları ve story rendering

Edge Function log'larında token, parola, kullanıcı metni veya hassas sağlık verisi bulunmayacak.

## Hesap silme

İşlem idempotent tasarlanır:

1. Kullanıcı onayı ve yeniden authentication.
2. Kullanıcının sahip olduğu storage prefix'lerinin listelenmesi.
3. Dosyaların silinmesi; zaten olmayan dosya hata sayılmamalı.
4. Sosyal bağlantıların temizlenmesi.
5. Kullanıcı tablolarının cascade ile temizlenmesi.
6. Auth kullanıcısının silinmesi.
7. Client session temizliği ve login route'una yönlendirme.

Yarıda kalan işlemler tekrar çalıştırıldığında mevcut olmayan kaynakları güvenle atlayabilmelidir. Fonksiyon başarısızlığı kullanıcıya genel bir hata ve tekrar deneme seçeneği vermelidir.

## Input ve hata güvenliği

- Tüm mutation input'ları Zod ve veritabanı constraint'leri ile doğrulanır.
- SQL interpolation yapılmaz; Supabase parametreli sorguları kullanılır.
- Kullanıcıya SQL, stack trace, token veya iç servis bilgisi gösterilmez.
- Validation, network ve server hataları ayrı hata kodlarına dönüştürülür.
- Üretim log'ları minimum kişisel veri prensibini izler.

## Güvenlik doğrulama planı

Her veri modülü için başka bir kullanıcı JWT'siyle select/update/delete denemeleri integration testinde reddedilmelidir. Storage policy'leri de aynı sahiplik sınırıyla test edilmelidir.
