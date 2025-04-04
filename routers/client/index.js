const router = require('express').Router();

router.get('/', (req, res) => {
    res.send(`<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SpeedSMM - Anasayfa</title>
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css">
</head>
<body class="bg-gradient-to-br from-blue-100 to-purple-100 min-h-screen flex items-center justify-center p-4 font-sans">
    <div class="max-w-md w-full bg-white rounded-xl shadow-xl overflow-hidden">
        <div class="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-center">
            <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-md mb-4">
                <i class="fas fa-rocket text-purple-600 text-3xl"></i>
            </div>
            <h1 class="text-3xl font-bold text-white">SpeedSMM</h1>
            <p class="text-blue-100 mt-1">Sosyal Medya Pazarlama Hizmetleri</p>
        </div>
        <div class="p-8">
            <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div class="flex items-start">
                    <div class="flex-shrink-0">
                        <i class="fas fa-exclamation-triangle text-yellow-500"></i>
                    </div>
                    <div class="ml-3">
                        <h3 class="text-sm font-medium text-yellow-800">Önemli Duyuru</h3>
                        <p class="text-sm text-yellow-700 mt-1">Bu SpeedSMM sürümü artık desteklenmeyecektir.</p>
                    </div>
                </div>
            </div>
            
            <h2 class="text-2xl font-bold text-gray-800 mb-4">Hoş Geldiniz!</h2>
            
            <p class="text-gray-600 mb-6">SpeedSMM.COM üzerinden <span class="font-semibold text-blue-600">Versiyon 5.0</span> ve üzeri sürümleri ilk ay ücretsiz deneyebilirsiniz.</p>
            
            <div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p class="text-sm text-red-700"><i class="fas fa-info-circle mr-1"></i> SpeedSMM Versiyon 4.0 ve altı sürümler için destek verilmemektedir.</p>
            </div>
            
            <a href="https://speedsmm.com" class="block w-full text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium py-3 px-4 rounded-lg shadow hover:shadow-lg transition duration-300">
                Yeni Sürümü Keşfedin
            </a>
        </div>
        <div class="border-t border-gray-200 bg-gray-50 px-6 py-4">
            <div class="text-center text-sm text-gray-500">
                <p>© 2025 SpeedSMM. Tüm hakları saklıdır.</p>
            </div>
        </div>
    </div>
</body>
</html>
        `);
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
