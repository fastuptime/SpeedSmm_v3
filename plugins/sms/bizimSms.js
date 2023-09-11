module.exports =  {
    name: "bizimSms",
    version: "1.0.0",
    author: "Can",
    run: async function (app, auth, data) {
        if (!siteData.site.number.status) return sendNotification.run(siteAdmins, { title: "Onay Kodu Gönderilemedi.", message: `Sistem Kapalı #1` }) && { status: false, message: "SMS sistemi aktif değil." }
        if (!data.to || data.to.length != 10 || isNaN(data.to)) return { status: false, message: "Lütfen geçerli bir telefon numarası giriniz. (5xxxxxxxxx)" }
        if (siteData.site.number.sender.service != "bizimsms") return sendNotification.run(siteAdmins, { title: "Onay Kodu Gönderilemedi.", message: `bizimSms Olarak Ayarlanmadığı halde bizimSms Api Kullanıyorsunuz! #2` }) && { status: false, message: "SMS servisi netGsm olarak ayarlanmamış." }

        let message = `Code: ${data.code}`;
        if(!auth) {
            if(!data.message) return { status: false, message: "Mesaj bilgisi girilmedi." }
            message = data.message;
        }

        let url = `http://sms.bizimsms.mobi:8080/api/smsget/v1?username=${siteData.site.number.sender.username}&password=${siteData.site.number.sender.password}&header=${siteData.site.number.sender.header}&gsm=90${data.to}&message=${message}`;
        url = encodeURI(url);
        let xg = await axios.get(url);
        let resx = JSON.stringify(xg.data);
        if (resx.includes("00")) {
            return { status: true, message: "SMS başarıyla gönderildi." }
        } else {
            sendNotification.run(siteAdmins, { title: "Onay Kodu Gönderilemedi.", message: `Hata sebebi bilinmiyor #3` });
            return { status: false, message: "SMS gönderilirken bir hata oluştu." }
        }
    }
};