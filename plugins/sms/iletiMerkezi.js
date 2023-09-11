module.exports =  {
    name: "iletiMerkezi",
    version: "1.0.0",
    author: "Can",
    run: async function (app, auth, data) {
        if (!siteData.site.number.status) return sendNotification.run(siteAdmins, { title: "Onay Kodu Gönderilemedi.", message: `Sistem Kapalı #1` }) && { status: false, message: "SMS sistemi aktif değil." }
        if (!data.to || data.to.length != 10 || isNaN(data.to)) return { status: false, message: "Lütfen geçerli bir telefon numarası giriniz. (5xxxxxxxxx)" }
        if (siteData.site.number.sender.service != "iletimerkezi") return sendNotification.run(siteAdmins, { title: "Onay Kodu Gönderilemedi.", message: `iletiMerkezi Olarak Ayarlanmadığı halde iletiMerkezi Api Kullanıyorsunuz! #2` }) && { status: false, message: "SMS servisi netGsm olarak ayarlanmamış." }

        let message = `Code: ${data.code}`;
        if(!auth) {
            if(!data.message) return { status: false, message: "Mesaj bilgisi girilmedi." }
            message = data.message;
        }

        let url = `https://api.iletimerkezi.com/v1/send-sms/get/?username=${siteData.site.number.sender.username}&password=${siteData.site.number.sender.password}&text=${message}&receipents=${data.to}&sender=${siteData.site.number.sender.header}`;
        url = encodeURI(url);
        try {
            let xg = await axios.get(url);
            let resx = xg.data;
            if (resx.includes("<code>200</code>")) {
                return { status: true, message: "SMS başarıyla gönderildi." }
            } else {
                sendNotification.run(siteAdmins, { title: "Onay Kodu Gönderilemedi.", message: `Hata sebebi bilinmiyor #3` });
                return { status: false, message: "SMS gönderilirken bir hata oluştu." }
            }
        } catch (error) {
            return { status: false, message: "SMS gönderilirken bir hata oluştu." }
        }
    }
};