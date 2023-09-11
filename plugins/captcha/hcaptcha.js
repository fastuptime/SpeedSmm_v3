const { verify } = require('hcaptcha');
module.exports =  {
    name: "hcaptcha",
    version: "1.0.0",
    author: "Can",
    run: async function (app, token) {
        if(!token) return { status: false, message: "Token Bulunamadı" };
        if(!siteData.site.integrations.captcha.status) return { status: false, message: "Captcha Sistemi Aktif Değil" };
        if(siteData.site.integrations.captcha.service) return { status: false, message: "Captcha Sistemi Google ReCaptcha Olarak Ayarlanmış" };
        let x = await verify(siteData.site.integrations.captcha.secretKey, token)
        if(x.success) return { status: true, message: "Doğrulama Başarılı" }
        else return { status: false, message: "Doğrulama Başarısız" }
        
    }
};