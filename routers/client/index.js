const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('<center><h1>Siteye hoşgeldiniz!</h1><br>Ana Sayfa Şimdilik Burası!</center>');
});

router.get(sitePages.newOrder.url, checkAuth, async (req, res) => {
    res.render('client/pages/index.ejs', {
        page: sitePages.newOrder,
        platforms: await platformModel.find({}),
    });
});

router.get(sitePages.orders.url, checkAuth, async (req, res) => {
    let ordersx;
    if (req.query.searchid) ordersx = await orderModel.find({ userID: res.locals.user._id, "order.id": req.query.searchid }).sort({ date: -1 });
    else ordersx = await orderModel.find({ userID: res.locals.user._id }).sort({ date: -1 });
    res.render('client/pages/orders.ejs', {
        page: sitePages.orders,
        ordersx
    });
});

router.get(sitePages.services.url, checkAuth, (req, res) => {
    res.render('client/pages/services.ejs', {
        page: sitePages.services
    });
});

router.get(sitePages.refill.url, checkAuth, async (req, res) => {
    res.render('client/pages/refill.ejs', {
        page: sitePages.refill,
        refillx: await refillModel.find({ userID: res.locals.user._id }).sort({ date: -1 })
    });
});

router.get(sitePages.balance_load.url, checkAuth, async (req, res) => {
    let histroyBalance = await payModel.find({ userID: res.locals.user._id, status: "success" }).sort({ date: -1 });
    res.render('client/pages/balance_load.ejs', {
        page: sitePages.balance_load,
        histroyBalance
    });
});

router.get(sitePages.support.url, checkAuth, async (req, res) => {
    if(!siteData.site.support.status) return res.redirect('/404')
    res.render('client/pages/support.ejs', {
        page: sitePages.support,
        supports: await ticketModel.find({ userID: res.locals.user._id }).sort({ updated_at: -1 }),
    });
});

router.get(sitePages.api.url, checkAuth, (req, res) => {
    res.render('client/pages/api.ejs', {
        page: sitePages.api
    });
});

router.get(sitePages.child_panels.url, checkAuth, (req, res) => {
    if(!siteData.site.modules.childPanel.status) return res.redirect('/404')
    res.render('client/pages/child_panels.ejs', {
        page: sitePages.child_panels
    });
});

router.get(sitePages.terms.url, checkAuth, (req, res) => {
    res.render('client/pages/terms.ejs', {
        page: sitePages.terms
    });
});

router.get(sitePages.invite.url, checkAuth, (req, res) => {
    if (!siteData.site.modules.referral.status) return res.redirect('/404')
    res.render('client/pages/invite.ejs', {
        page: sitePages.invite
    });
});

router.get(sitePages.account.url, checkAuth, (req, res) => {
    moment = require('moment-timezone');
    res.render('client/pages/account.ejs', {
        page: sitePages.account,
        timezones: moment.tz.names(),
    });
});

router.get(sitePages.logout.url, checkAuth, async (req, res) => {
    res.clearCookie('username');
    res.clearCookie('pass');
    res.redirect('/');
});

module.exports = router;