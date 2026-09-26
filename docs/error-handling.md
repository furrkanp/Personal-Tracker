# Hata Yönetimi

## Durum modeli

Her server-backed ekran en az şu durumları ele alacak:

- Loading
- Empty
- Success
- Error
- Offline
- Permission denied
- Session expired

Bu durumlar ortak design-system component'leriyle gösterilecek; her modül kendi farklı hata ekranını kopyalamayacak.

## Hata sınıfları

### Validation

Kullanıcının düzeltebileceği alan hatasıdır ve ilgili input'a bağlanır.

> Görev adı en az 1 karakter olmalı.

### Network

İstek sunucuya ulaşmadığında gösterilir; yazılmış form verisi korunur.

> Bağlantı kurulamadı. Verilerin kaybolmadı. Tekrar deneyebilirsin.

### Server

Beklenmeyen server/DB hatasıdır; hassas teknik detay gösterilmez.

> Sunucuda beklenmeyen bir hata oluştu. Lütfen daha sonra tekrar dene.

### Permission

Kamera, bildirim, storage veya sistem izni reddedildiğinde uygulama çalışmaya devam eder ve alternatif action sunulur.

### Session expired

Kullanıcı login ekranına yönlendirilir; mümkünse doldurulmuş draft korunur ve tekrar giriş sonrası geri yüklenir.

## Uygulama yaklaşımı

- API katmanı Supabase hatalarını uygulama seviyesinde sınıflandırır.
- UI yalnızca kullanıcıya uygun mesaj ve retry action'ı görür.
- Hatalar sessizce yutulmaz; beklenen hatalar görünür state'e dönüştürülür.
- Global Error Boundary beklenmeyen render hatalarında uygulamanın tamamen kapanmasını önler.
- Development'ta ayrıntılı console/log, production'da redacted event log tutulur.

## Retry ve duplicate koruması

- Retry yalnızca idempotent veya request id ile duplicate korumalı mutation'larda otomatikleştirilecek.
- Submit butonları request sürerken disabled olacak.
- Çift tıklama aynı kaydı iki kez oluşturmamalı.
- Mutation timeout'larında kullanıcının metni kaybedilmeyecek.
- Optimistic update rollback tanımı olmadan kullanılmayacak.

## Offline davranışı

TanStack Query cache son görüntülenen veriyi gösterebilir. Yeni veri gönderilemediğinde açık offline banner ve retry action gösterilir. Tam offline queue ilk sürümde varsayılan değildir; eklendiğinde mutation idempotency key'i ve kalıcı queue gerektirecektir.

## Log güvenliği

Asla parola, token, SQL, stack trace, kullanıcı metni veya hassas sağlık verisi loglanmaz. Log event'leri mümkünse kullanıcıyı doğrudan tanımlamayan request/session metadata'sı içerir.
