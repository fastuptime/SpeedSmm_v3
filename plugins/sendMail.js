const nodemailer = require("nodemailer");
/*

Örnek Kullanım:
sendMail.run(app,
    false
{
    to: "fastuptime@gmail.com",
    name: "Can",
    link: "https://fastuptime.net"
}).then((data) => {
    console.log(data);
});

[Plugin] Yapımcı: Can, sendMail(1.0.0) yuklendi.
{
  status: true,
  message: 'Mail başarıyla gönderildi.',
  info: '<ed17780f-d673-69fa-4b80-a019627b5002@gmail.com>'
}


// Admin alert true ise adminlerin hesaplarına site içi bildirim gider.

*/
module.exports =  {
    name: "sendMail",
    version: "1.0.0",
    author: "Can",
    run: async function (app, auth, data) {
        if (!siteData.site.mail.status) return sendNotification.run(siteAdmins, { title: "Mail gönderilemedi.", message: "Mail sistemi aktif değil. #1" })  && { status: false, message: "Mail sistemi aktif değil." };
        if(!data.to) return { status: false, message: "Lütfen geçerli bir mail adresi giriniz." }

        let transporter = nodemailer.createTransport({
            host: siteData.site.mail.smtp.host,
            port: siteData.site.mail.smtp.port,
            secure: siteData.site.mail.smtp.secure, // true for 465, false for other ports
            auth: {
                user: siteData.site.mail.smtp.auth.user,
                pass: siteData.site.mail.smtp.auth.pass,
            },
        });

        let subject = siteData.site.mail.title;
        let html = siteData.site.mail.template.replace("{name}", data.name).replace("{link}", data.link);
        if(!auth) {
            if(!data.subject || !data.html) return { status: false, message: "Subject veya html bilgisi girilmedi." }
            subject = data.subject;
            html = data.html;
        }
        let info = await transporter.sendMail({
            from: `"${siteData.site.integrations.seo.name}" <${siteData.site.mail.smtp.auth.user}>`, // sender address
            to: data.to, 
            subject: subject,
            html: html,
        });

        if (!info.messageId) return sendNotification.run(siteAdmins, { title: "Mail Gönderilemedi.", message: `Gönderilirken bir hata oluştu #2`}) && { status: false, message: "Mail gönderilirken bir hata oluştu. Üzgünüz!" }
        return { status: true, message: "Mail başarıyla gönderildi.", info: info.messageId }

    }
};