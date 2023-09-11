/*

Örnek Kullanım:
netGsm.run(app,
    false, // true ise mesaj gönderirken code parametresini kullanmaz.
{
    to: "5xxxxxxxxx",
    code: "123456" // 6 haneli kod
}).then((data) => {
    console.log(data);
});

[Plugin] Yapımcı: Can, netGsm(1.0.0) yuklendi.
{
  status: true,
  message: 'SMS başarıyla gönderildi.',
}

// Admin alert true ise adminlerin hesaplarına site içi bildirim gider.

*/
module.exports =  {
    name: "netGsm",
    version: "1.0.0",
    author: "Can",
    run: async function (app, auth, data) {
        if (!siteData.site.number.status) return sendNotification.run(siteAdmins, { title: "Onay Kodu Gönderilemedi.", message: `Sistem Kapalı #1` }) && { status: false, message: "SMS sistemi aktif değil." }
        if (!data.to || data.to.length != 10 || isNaN(data.to)) return { status: false, message: "Lütfen geçerli bir telefon numarası giriniz. (5xxxxxxxxx)" }
        if (siteData.site.number.sender.service != "netgsm") return sendNotification.run(siteAdmins, { title: "Onay Kodu Gönderilemedi.", message: `NetGsm Olarak Ayarlanmadığı halde NetGsm Api Kullanıyorsunuz! #2` }) && { status: false, message: "SMS servisi netGsm olarak ayarlanmamış." }

        let message = `Code: ${data.code}`;
        if(!auth) {
            if(!data.message) return { status: false, message: "Mesaj bilgisi girilmedi." }
            message = data.message;
        }

        let xdata = qs.stringify({
            'usercode': siteData.site.number.sender.username,
            'password': siteData.site.number.sender.password,
            'gsmno': data.to,
            'message': message,
            'msgheader': siteData.site.number.sender.header,
            'filter': '0',
            'startdate': '',
            'stopdate': ''
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://api.netgsm.com.tr/sms/send/get',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cookie': 'PHPSESSID=ZZZZZZZZZZZZZZZZZZZ'
            },
            data: xdata
        };

        let xg = await axios(config)
        let resx = JSON.stringify(xg.data);
        if (resx.includes("00")) {
            return { status: true, message: "SMS başarıyla gönderildi." }
        } else {
            sendNotification(siteAdmins, { title: "Onay Kodu Gönderilemedi.", message: `Hata sebebi bilinmiyor #3` });
            return { status: false, message: "SMS gönderilirken bir hata oluştu." }
        }
    }
};