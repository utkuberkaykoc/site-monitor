# Site Checker

Bu proje, belirli web sitelerinin durumunu kontrol eder ve sonuçları Discord üzerinden bildirir.

## Kurulum

1. Bu projeyi klonlayın:
   ```sh
   git clone https://github.com/utkuberkaykoc/isSiteAvailable.git
   cd isSiteAvailable
   ```

2. Gerekli paketleri yükleyin:
   ```sh
   npm install
   ```

3. `index.js` dosyasındaki `siteURLs` ve `discordWebhookURL` değişkenlerini güncelleyin:
   - `siteURLs`: Kontrol etmek istediğiniz web sitelerinin URL'lerini bu diziye ekleyin.
   - `discordWebhookURL`: Discord Webhook URL'nizi bu değişkene ekleyin.

   Örnek:
   ```javascript
   const siteURLs = [
     'https://utku.berkaykoc.net',
     'https://example.com',
     'https://anotherexample.com'
   ];
   const discordWebhookURL = 'YOUR_DISCORD_WEBHOOK_URL';
   ```

4. Uygulamayı başlatın:
   ```sh
   npm start
   ```

## Kullanım

Bu uygulama, belirli web sitelerinin durumunu her dakika kontrol eder ve sonuçları Discord'a bildirir. Kontrol süresini ayarlamak için `setInterval` fonksiyonundaki süreyi (milisaniye cinsinden) güncelleyebilirsiniz.

Örnek:
```javascript
// Web sitelerini her dakika kontrol et
checkAllWebsites();
setInterval(checkAllWebsites, 60000); // 60000 milisaniye = 1 dakika
```

## Lisans

Bu proje MIT lisansı ile lisanslanmıştır.