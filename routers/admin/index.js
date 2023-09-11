const { render } = require('ejs');

const router = require('express').Router();

router.get('/', checkAdmin, async (req, res) => {
    res.redirect('/admin/users');
});

router.get('/users', checkAdmin, async (req, res) => {
    let {
        user
    } = req.query;
    let users;
    if(user && user.length == 24) users = await userModel.find({ _id: user });
    else users = await userModel.find({});
    res.render('admin/pages/index', {
        users
    });
});

router.get('/orders', checkAdmin, async (req, res) => {
    let ordersx;
    if (req.query.user && req.query.user.length == 24) ordersx = await orderModel.find({ userID: req.query.user });
    else ordersx = await orderModel.find({});
    res.render('admin/pages/orders', {
        ordersx,
    });
});

router.get('/statistics', checkAdmin, async (req, res) => {
    let {
        category
    } = req.query;
    if (!category) category = 'register';
    try {
        const analyticsData = await analyticsModel.findOne();

        if (!analyticsData) {
        return res.status(404).json({ error: 'Analytics verisi bulunamadı' });
        }

        const thisYear = analyticsData.categorys.map((category) => {
            const yearly = category.yearly.find((year) => year.year === moment().format('YYYY'));
            if (yearly) return { category: category.category, yearly: yearly };
        });

        let categoryItem = thisYear.filter((item) => item.category == category);
        if (!categoryItem) categoryItem = [{ category: category, yearly: [] }];
        
        res.render('admin/pages/statistics', {
            data: categoryItem,
        });
  } catch (error) {
    console.error('Analytics verisi çekme hatası:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

router.get('/payments', checkAdmin, async (req, res) => {
    let payments;
    if(req.query.user && req.query.user.length == 24) payments = await payModel.find({ userID: req.query.user });
    else payments = await payModel.find({});
    res.render('admin/pages/payments', {
        payments
    });
});

router.get('/payments/details/:id', checkAdmin, async (req, res) => {
    let {
        id
    } = req.params;
    if (!id && id.length != 24) return res.redirect('/admin/payments?succes=false&message=Geçersiz ID');
    let data = await payModel.findOne({ _id: id });
    if (!data) return res.redirect('/admin/payments?succes=false&message=Ödeme Bulunamadı');
    res.json(data)
});

router.get('/support', checkAdmin, async (req, res) => {
    let status = ['pending', 'answered', 'resolved', 'closed']
    let supports;
    if(req.query.user && req.query.user.length == 24) supports = await ticketModel.find({ userID: req.query.user });
    else supports = await ticketModel.find({});
    if(status.includes(req.query.status)) supports = supports.filter((support) => support.status === req.query.status);
    res.render('admin/pages/support',
    {
        supports,
    });
});

router.get('/child_panels', checkAdmin, async (req, res) => {
    let panels;
    if(req.query.user && req.query.user.length == 24) panels = await childpanelModel.find({ userID: req.query.user });
    else panels = await childpanelModel.find({});
    res.render('admin/pages/child_panels', {
        panels
    });
});

router.get('/logs', checkAdmin, async (req, res) => {
    let logs;
    if(req.query.user && req.query.user.length == 24) {
        logs = await userModel.find({ _id: req.query.user }).select('logs');
        logs = logs[0].logs;
    } else {
        logs = await userModel.find({}).select('logs');
        new Promise((resolve, reject) => {
            logs = logs.map((log) => log.logs);
            const merged = [].concat.apply([], logs);
            logs = merged;
            resolve();
        });
    }
    res.render('admin/pages/logs', {
        logs
    });
});

router.get('/view', checkAdmin, async (req, res) => {
    let pages = await siteModel.find({}).select('site.pages');
    pages = pages[0].site.pages;
    res.render('admin/pages/view', {
        pages
    });
});

module.exports = router;