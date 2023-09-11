module.exports = {
    port: 80,
    mongoDB: "mongodb://localhost:27017/speedsmm", // MongoDB bağlantı adresi
    siteUrl: "http://localhost", // Site URL Sonuna / koymayın lütfen örn: https://fastuptime.com http://fastuptime.com
    licenseKey: "speedsmm", // Lisans anahtarı bu örnektir. Lütfen kendi lisans anahtarınızı girin. Aksi taktirde sistem kurulumu hatalı olacaktır.
    salt: {
        one: "speedsmm", // MD5 için ilk kurulumdan sonra Şifreleri asla değiştirmeyin! 
        two: "speedsmm" // SHA256 için Rasgele bir şifre kullanın bu örnektir
    }
};