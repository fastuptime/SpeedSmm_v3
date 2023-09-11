const router = require('express').Router();

router.get('/login', (req, res) => {
    if (req.cookies.username && req.cookies.pass) return res.redirect(`/?success=false&message=Zaten Giriş Yapmışsınız`);
    res.render('client/pages/auth/login.ejs', {
        page: { i18n: "login", url: "/login" }
    });
});

router.get('/register', (req, res) => {
    if(req.cookies.username && req.cookies.pass) return res.redirect(`/?success=false&message=Zaten Giriş Yapmışsınız`);
    res.render('client/pages/auth/register.ejs', {
        page: { i18n: "register", url: "/register" }
    });
});

module.exports = router;