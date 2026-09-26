# Responsive Layout ve Safe Area

## Breakpoint'ler

```text
compact: 0–479 px
mobile: 480–767 px
tablet: 768–1023 px
desktop: 1024 px ve üzeri
```

React Native tarafında `useWindowDimensions` ve platforma uygun ölçüm kullanılacak. Web CSS tarafında aynı breakpoint token'ları kullanılacak; ortak layout kararları tek bir constants dosyasından türetilecek.

## Layout

### Mobile

- Tek kolon.
- Alt tab navigation.
- Minimum 44x44 dokunma alanı.
- Kritik submit/action alanları safe area içinde görünür.
- Formlar `ScrollView` içinde, klavye davranışı platforma göre yapılandırılmış şekilde çalışır.

### Tablet

- Uygun ekranlarda iki kolon.
- Liste + detay veya filtre + içerik düzeni.
- Landscape durumda genişlik sınırsız bırakılmaz; içerik max-width ile merkezlenir.

### Desktop web

- 1200–1440 px aralığında max content width.
- Sol navigation.
- Orta ana içerik.
- Analytics ve günlük özetlerde isteğe bağlı sağ panel.
- Mouse, keyboard focus ve hover durumları görünür.

## Safe area yaklaşımı

Safe area yalnızca ekran shell'i tarafından uygulanır; child component'ler aynı inset'i tekrar eklemez.

```tsx
const insets = useSafeAreaInsets();

const contentStyle = {
  paddingTop: Math.max(insets.top, 16),
  paddingBottom: Math.max(insets.bottom, 16),
};
```

- iOS notch/Dynamic Island için üst inset.
- Home indicator ve Android navigation bar için alt inset.
- Tab bar kendi bottom inset'ini yönetir.
- Modal/bottom sheet içerikleri kendi container safe area'sını kullanır.
- Web'de gerektiğinde `env(safe-area-inset-top)` ve ilgili CSS değişkenleri kullanılır.

## Keyboard

Form ekranlarında `KeyboardAvoidingView` ile `ScrollView` sırası platform testleriyle doğrulanacak. Aktif input görünür kalması için gerekirse `scrollToFocusedInput` yaklaşımı kullanılacak; her ekrana birbirinden farklı workaround eklenmeyecek.

Sayısal alanlarda numeric keyboard, multiline alanlarda uygun return davranışı kullanılacak. Submit butonları klavye tarafından kapatılmayacak.

## Erişilebilirlik ve büyük yazı

- Metinler sabit piksel yüksekliğine zorlanmayacak.
- Büyük fontlarda kartlar dikey büyüyebilecek.
- Renk tek başına durum belirtmeyecek; ikon, metin veya shape ile desteklenecek.
- Reduce Motion dikkate alınacak.
- Web focus ring görünür kalacak.

## Kabul testleri

iPhone SE, standart iPhone, Dynamic Island'lı iPhone, küçük Android, gesture ve üç butonlu Android navigation, tablet portrait/landscape, mobil Safari/Chrome ve desktop tarayıcılarda; açık/koyu tema, klavye açık ve büyük yazı boyutuyla kontrol yapılacak.
