# Test Stratejisi

## Katmanlar

### Unit

İzole ve hızlı testler:

- Tarih ve timezone dönüşümleri
- Günlük metrik hesaplama
- XP ve streak hesaplama
- Zod validation
- Tekrarlayan görev üretimi
- Story template veri dönüşümü
- Responsive breakpoint yardımcıları

### Integration

Gerçek Supabase test projesi veya izole local Supabase ile:

- Auth kayıt/giriş/çıkış
- RLS select/insert/update/delete davranışı
- Günlük log duplicate engeli
- Görev tamamlama ve metric update
- Storage upload ve signed URL
- Hesap silme idempotency
- Workout ilişkileri ve geçmiş performans sorgusu

### E2E

Deterministik test hesabıyla:

1. Kayıt ol
2. Giriş yap
3. Profil oluştur
4. Günlük not ekle
5. Görev oluştur ve tamamla
6. Yemek ekle
7. Spor ve set kaydet
8. Analytics ekranını aç
9. Story üret
10. Hesabı sil

## Test altyapısı kararı

İlk proje iskeletinde test runner seçimi, Expo sürümü ve web/native uyumluluğu doğrulandıktan sonra yapılacak. Unit/integration için Jest veya Vitest arasından mevcut Expo toolchain'iyle en az özel ayar gerektireni seçilecek. E2E için Expo ile uyumlu bir araç seçilecek; dependency yalnızca gerçek ihtiyaç oluştuğunda eklenecek.

## Manuel cihaz matrisi

- iPhone SE ve Dynamic Island'lı iPhone
- Küçük ve büyük Android
- Android gesture navigation ve üç butonlu navigation
- iPad/tablet portrait ve landscape
- Mobil Safari, mobil Chrome
- Desktop Chrome, Safari, Firefox
- Açık/koyu tema
- Büyük sistem yazı boyutu
- Klavye açık form
- Yavaş ağ ve tamamen offline durum

## Her aşamanın kalite kapısı

```text
TypeScript strict check
Lint
Format check
İlgili unit testler
İlgili integration testler
E2E veya manuel cihaz kontrolü
Loading / empty / error / offline durumları
```

Başarısız test varken özellik tamamlandı olarak raporlanmayacak. Testlerde gerçek kullanıcı verisi ve sırlar kullanılmayacak.
