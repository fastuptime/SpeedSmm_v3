module.exports =  {
    name: "recaptcha",
    version: "1.0.0",
    author: "Can",
    run: async function (app, token) {
        if(!token) return { status: false, message: "Token Bulunamadı" };
        if(!siteData.site.integrations.captcha.status) return { status: false, message: "Captcha Sistemi Aktif Değil" };
        if(!siteData.site.integrations.captcha.service) return { status: false, message: "Captcha Sistemi H-Captcha Olarak Ayarlanmış" };
        let data = qs.stringify({
            secret: siteData.site.integrations.captcha.secretKey,
            response: token
        });
        let conf = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://www.google.com/recaptcha/api/siteverify',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        };
        let x = await axios(conf);
        if(x.data.success) return { status: true, message: "Doğrulama Başarılı" }
        else return { status: false, message: "Doğrulama Başarısız" }   
    }
};