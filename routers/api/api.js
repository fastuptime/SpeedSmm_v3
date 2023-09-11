const router = require('express').Router();

router.get('/exchange_rate', checkAuth, async (req, res) => {
    let data = await siteModel.findOne({});
    if(!data) return res.json({ status: "400", message: "Site Ayarları Bulunamadı" });
    let user_currency = req.cookies.currency || data.site.currency;
    let exchange = data.site.exchange_rate[data.site.currency.toLowerCase()][user_currency.toLowerCase()]
    let user_balance;
    let spent;
    if(user_currency == data.site.currency) user_balance = res.locals.user.balance;
    else user_balance = res.locals.user.balance * exchange;
    if(user_currency == data.site.currency) spent = res.locals.user.spent;
    else spent = res.locals.user.spent * exchange;
    return res.json({
        status: "200",
        message: "Site Ayarları Bulundu",
        data: {
            currency: data.site.currency,
            user_currency,
            exchange,
            user_balance,
            spent
        }
    });
});

router.get('/payments/:pos', async (req, res) => {
    let x = req.params.pos;
    if(!x) return res.json({ status: "400", message: "Ödeme Bulunamadı" });
    x = Object.values(siteData.virtualPos).find(z => z.pos == x);
    if(!x) return res.json({ status: "400", message: "Ödeme Bulunamadı" });
    return res.json({
        status: "200", message: "Ödeme Bulundu", data:
            {
                status: x.status,
                name: x.name,
                commission: x.commission,
                min: x.minPrice,
                max: x.maxPrice,
            }
    });
});

router.post('/auth/register', async (req, res) => {
    if (req.cookies.username && req.cookies.pass) return res.json({ status: "400", message: "Zaten Giriş Yapmışsınız" });
    let {
        token,
        username,
        name,
        surname,
        email,
        phone,
        password,
        terms
    } = req.body;
    if (!token || !username || !name || !surname || !email || !password) return res.json({ status: "400", message: "Boş Alan Bırakmayınız" });
    if (password.length < 6) return res.json({ status: "400", message: "Şifre En Az 6 Karakter Olmalıdır" });

    let checkAc = await userModel.findOne({ username });
    if (checkAc) return res.json({ status: "400", message: "Kullanıcı Adı Kullanılıyor" });
    let checkMail = await userModel.findOne({ "mail.address": email });
    if (checkMail) return res.json({ status: "400", message: "E-Posta Adresi Kullanılıyor" });

    if(siteData.site.number.status || siteData.site.number.numberArea) {
        if(!phone) return res.json({ status: "400", message: "Telefon Numarası Gerekli" });
        if(phone.length < 10) return res.json({ status: "400", message: "Telefon Numarası 10 Haneli Olmalıdır (Örnek: 5XXXXXXXXX)" });
    }

    if(siteData.site.registerAgreement) {
        if(!terms) return res.json({ status: "400", message: "Kullanım Koşullarını Kabul Etmeniz Gerekli" });
    }

    if(siteData.site.integrations.captcha.status) {
        if(siteData.site.integrations.captcha.service) {
            let captcha = await recaptcha.run(app, token);
            if(!captcha.status) return res.json({ status: "400", message: captcha.message });
        } else {
            let captcha = await hcaptcha.run(app, token);
            if(!captcha.status) return res.json({ status: "400", message: captcha.message });
        }
    }

    let code = Math.floor(100000 + Math.random() * 900000);
    if(siteData.site.number.status) {
        if(siteData.site.number.sender.service == "netgsm") {
            let sms = await netGsm.run(app, true, { to: phone, code: code });
            if(!sms.status) return res.json({ status: "400", message: sms.message });
        } else if(siteData.site.number.sender.service == "bizimsms") {
            let sms = await bizimSms.run(app, true, { to: phone, code: code });
            if(!sms.status) return res.json({ status: "400", message: sms.message });
        } else if(siteData.site.number.sender.service == "iletimerkezi") {
            let sms = await iletiMerkezi.run(app, true, { to: phone, code: code });
            if(!sms.status) return res.json({ status: "400", message: sms.message });
        }
    } 

    let mailCode = crypto.randomBytes(24).toString('hex');
    if (siteData.site.mail.status) {
        let mail = await sendMail.run(app, true, { to: email, name: name, link: `${siteData.site.integrations.seo.url}/auth/verify?code=${mailCode}`})
        if(!mail.status) return res.json({ status: "400", message: mail.message });
    }   

    let bal = 0;
    if (siteData.site.modules.freeBalance.status) bal = siteData.site.modules.freeBalance.price;

    let reffered;
    if(siteData.site.modules.referral.status) {
        if(req.cookies.ref) {
            let ref = await userModel.findOne({ "ref.ref_code": req.cookies.ref });
            if(ref) {
                reffered = ref._id;
                await userModel.updateOne({ _id: ref._id }, { $inc: { "ref.reffered": 1 }, $push: { "ref.reffered_users": { _id: user._id, username: username, date: moment().format('DD MMMM YYYY HH:mm:ss') } } });
            }
        }
    }

    speedAnalytics.run('register', 1); // İstatistik için

    let user = new userModel({
        username,
        name,
        surname,
        balance: Number(bal),
        password: await fastCrypto.run(password),
        mail: {
            address: email,
            code: mailCode
        },
        phone: {
            number: phone || '',
            code: code
        },
        ref: {
            reffered_by: reffered || '',
        },
        logs: [
            {
                ip: req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress,
                date: moment().format('DD MMMM YYYY HH:mm:ss'),
                action: "Register",
                status: "Success",
                userID: user._id,
                details: {
                    userAgent: req.headers['user-agent'],
                    referer: req.headers['referer'] || req.headers['referrer']
                }
            }
        ],
    });

    await user.save();

    res.cookie("username", username, { maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly: true });
    res.cookie("pass", await fastCrypto.run(password), { maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly: true }); 
    return res.json({ status: "200", message: "Kayıt Başarılı" });
});

router.post('/auth/login', async (req, res) => {
    if (req.cookies.username && req.cookies.pass) return res.json({ status: "400", message: "Zaten Giriş Yapmışsınız" });
    let {
        username,
        password,
        token
    } = req.body;
    if (!username || !password) return res.json({ status: "400", message: "Boş Alan Bırakmayınız" });

    if(siteData.site.integrations.captcha.status) {
        if(siteData.site.integrations.captcha.service) {
            let captcha = await recaptcha.run(app, token);
            if(!captcha.status) return res.json({ status: "400", message: captcha.message });
        } else {
            let captcha = await hcaptcha.run(app, token);
            if(!captcha.status) return res.json({ status: "400", message: captcha.message });
        }
    }

    let user = await userModel.findOne({ username });
    if (!user) return res.json({ status: "400", message: "Kullanıcı Bulunamadı" });
    if (user.password !== await fastCrypto.run(password)) {
        await userModel.updateOne({ _id: user._id },
            {
                $push:
                {
                    logs: {
                        ip: req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress,
                        date: moment().format('DD MMMM YYYY HH:mm:ss'),
                        action: "Login",
                        status: "Failed - Password",
                        userID: user._id,
                        details: {
                            userAgent: req.headers['user-agent'],
                            referer: req.headers['referer'] || req.headers['referrer']
                        }
                    }
                }
            });
        return res.json({ status: "400", message: "Şifre Hatalı" });
    }
    if (user.ban.status) {
        await userModel.updateOne({ _id: user._id },
            {
                $push:
                {
                    logs: {
                        ip: req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress,
                        date: moment().format('DD MMMM YYYY HH:mm:ss'),
                        action: "Login",
                        status: "Failed - Banned",
                        userID: user._id,
                        details: {
                            userAgent: req.headers['user-agent'],
                            referer: req.headers['referer'] || req.headers['referrer']
                        }
                    }
                }
            });
        return res.json({ status: "400", message: "Hesabınız Banlanmış" });
    }

    await userModel.updateOne({ _id: user._id },
        {
            $push:
            {
                logs: {
                    ip: req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress,
                    date: moment().format('DD MMMM YYYY HH:mm:ss'),
                    action: "Login",
                    status: "Success",
                    userID: user._id,
                    details: {
                        userAgent: req.headers['user-agent'],
                        referer: req.headers['referer'] || req.headers['referrer']
                    }
                }
            },
            $set: { last_login: moment().format('DD MMMM YYYY HH:mm:ss') }
        });
        
    speedAnalytics.run('login', 1); // İstatistik için

    res.cookie("username", username, { maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly: true });
    res.cookie("pass", await fastCrypto.run(password), { maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly: true });
    return res.json({ status: "200", message: "Giriş Başarılı" });
});

router.get('/platforms/get/:id', async (req, res) => {
    let id = req.params.id;
    if(!id) return res.json({ status: "400", message: "Platform Bulunamadı" });
    if(isNaN(id)) return res.json({ status: "400", message: "Platform Bulunamadı" });
    let data = await platformModel.findOne({ id: id, status: true });
    if(!data) return res.json({ status: "400", message: "Platform Bulunamadı" });
    return res.json({ status: "200", message: "Platform Bulundu", data: data });
});

router.get('/services/get/:service', async (req, res) => {
    let service = req.params.service;
    if(!service) return res.json({ status: "400", message: "Servis Bulunamadı" });
    if(isNaN(service)) return res.json({ status: "400", message: "Servis Bulunamadı" });
    let data = await serviceModel.find({ category: service, status: true });
    if(!data) return res.json({ status: "400", message: "Servis Bulunamadı" });
    let category = await categoryModel.findOne({ id: service });
    if(!category) return res.json({ status: "400", message: "Servis Bulunamadı" });
    if(data.length < 1) return res.json({ status: "200", message: "Servis Bulunamadı", category: category.description,  data: [{ id: 0, name: "Servis Bulunamadı", price: 0, min: 0, max: 0, description: "Servis Bulunamadı", category: 0 }] });
    return res.json({ status: "200", message: "Servis Bulundu", category: category.description, data: data.map(x => { return { id: x.id, name: x.name, price: x.price, min: x.min, max: x.max, description: x.description, category: x.category } }) });
});

router.post('/service/get/:service', async (req, res) => {
    let service = req.params.service;
    if(!service) return res.json({ status: "400", message: "Servis Bulunamadı" });
    if(isNaN(service)) return res.json({ status: "400", message: "Servis Bulunamadı" });
    let data = await serviceModel.find({ id: service, status: true });
    if(!data) return res.json({ status: "400", message: "Servis Bulunamadı" }); 
    return res.json({ status: "200", message: "Servis Bulundu", data: data });
});

module.exports = router;