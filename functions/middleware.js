const bodyParser = require('body-parser');
const ejs = require('ejs');
module.exports = function() {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.set('view engine', 'ejs');
    app.set('views', 'www');
    app.use('/client_assets', express.static('www/client/assets'));
    app.use('/admin_assets', express.static('www/admin/assets'));

    global.checkAuth = async (req, res, next) => {
        if (req.cookies.username && req.cookies.pass) {
            let user = await userModel.findOne({ username: req.cookies.username, password: req.cookies.pass });
            if (!user) {
                res.clearCookie('username');
                res.clearCookie('pass');
                return res.redirect(`/?success=false&message=Lütfen giriş yapınız.`);
            }

            if (user.ban.status) {
                res.clearCookie('username');
                res.clearCookie('pass');
                return res.redirect(`/?success=false&message=Hesabınız ${user.ban.reason} sebebiyle ${user.ban.date} tarihin'den itibaren yasaklanmıştır. Bir hata olduğunu düşünüyorsanız lütfen yetkililer ile iletişime geçiniz.`);
            }

            if (!req.originalUrl.includes('/verify') && user.role != "admin") {
                if (!user.mail.verified && siteData.site.mail.status) {
                    return res.redirect(`/?success=false&message=Lütfen mail adresinizi doğrulayınız.`);
                }

                if (!user.phone.verified && siteData.site.number.status) {
                    return res.redirect(`/?success=false&message=Lütfen telefon numaranızı doğrulayınız.`);
                }
            }

            if(siteData.site.maintenance.status && user.role == "user" && !req.originalUrl.includes('/maintenance')) {
                return res.redirect(`/maintenance?success=false&message=Site bakıma alınmıştır. Lütfen daha sonra tekrar deneyiniz.`);
            }

            res.locals.user = user;
            res.locals.role = user.role;
            res.locals.timezone = user.time_zone;
            res.locals.notifications = await notificationModel.find({ userID: user._id }).sort({ date: -1 }).limit(10);
            res.locals.langs = i18n.getLocales().map(x => { return { name: i18n.__(`langs.${x}.name`), code: x, flag: i18n.__(`langs.${x}.flag`) } });
            res.locals.lang = { name: i18n.__(`langs.${user.lang}.name`), code: user.lang, flag: i18n.__(`langs.${user.lang}.flag`) };
            res.locals.totalOrders = await orderModel.countDocuments({ userID: user._id });
            if (req.query.lang) {
                if(i18n.getLocales().includes(req.query.lang)) {
                    user.lang = req.query.lang;
                    await user.save();
                }
            }
            if(req.query.usercurrency) {
                res.cookie('currency', req.query.usercurrency, { maxAge: 1000 * 60 * 60 * 24 * 7 });
            }
            res.locals.user_currency = req.cookies.currency || siteData.site.currency;
            res.locals.answeredTickets = await ticketModel.countDocuments({ userID: user._id, status: "answered" });
            res.cookie('lang', user.lang, { maxAge: 1000 * 60 * 60 * 24 * 7 });
            next();
        } else {
            res.clearCookie('username');
            res.clearCookie('pass');
            res.redirect(`/?success=false&message=Lütfen giriş yapınız.`);
        }
    };

    global.checkAdmin = async (req, res, next) => {
        checkAuth(req, res, async() => {
            if (res.locals.role == "admin") {
                next();
            } else {
                res.redirect(`/?success=false&message=Yetkisiz giriş.`);
            }
        })
    };
};