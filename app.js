global.config = require('./config.js');
global.express = require('express');
global.app = express();
global.mongoose = require('mongoose');
global.Schema = mongoose.Schema;
global.moment = require('moment');
global.crypto = require('crypto');
global.colors = require('colors');
global.axios = require('axios');
global.cron = require('node-cron');
global.md5 = require('md5');
global.sha256 = require('sha256');
global.cookieParser = require('cookie-parser');
global.qs = require('qs');
global.fs = require('fs');

//////////////////////////// Multi Language ////////////////////////////
const { I18n } = require('i18n');
global.i18n = new I18n({
    locales: fs.readdirSync(__dirname + '/languages').filter(x => x.endsWith('.json')).map(x => x.replace('.json', '')),
    directory: __dirname + '/languages',
    defaultLocale: 'tr',
    cookie: 'lang',
    autoReload: true,
    mustacheConfig:
    {
        tags: ['{{', '}}'], // Örnek: {{__ 'Merhaba'}}
        disable: false 
    }
});

app.use(cookieParser());
app.use(i18n.init);
//////////////////////////// DATABASE ////////////////////////////

global.mongoDB = mongoose.createConnection(config.mongoDB,
{
    useNewUrlParser: true, useUnifiedTopology: true 
}).addListener('connected', function () {
    console.log('MongoDB baglantisi basarili.');
}).addListener('disconnected', function (err) {
    console.log('MongoDB baglantisi kesildi.');
}).addListener('error', function (err) {
    console.log('MongoDB baglantisi basarisiz.');
});
//////////////////////////// SCHEMA ////////////////////////////

global.ticketModel = require('./database/ticket.js');
global.notificationModel = require('./database/notification.js');
global.refillModel = require('./database/refill.js');
global.userModel = require('./database/user.js');
global.orderModel = require('./database/order.js');
global.payModel = require('./database/pay.js');
global.siteModel = require('./database/site.js');
global.serviceModel = require('./database/service.js');
global.platformModel = require('./database/platform.js');
global.categoryModel = require('./database/category.js');
global.analyticsModel = require('./database/sAnalytics.js');
global.childpanelModel = require('./database/childpanel.js');
global.siteData;
global.siteAdmins;
//////////////////////////// Functions ////////////////////////////
global.sendNotification = require('./plugins/sendNotification.js');
//////////////////////////// Load Plugins ////////////////////////////
const { glob } = require("glob");
const { promisify } = require("util");
global.globPromise = promisify(glob);

let plugins = [
    "sendMail",
    "fastexchange",
    "bizimSms",
    "netGsm",
    "iletiMerkezi",
    "fastCrypto",
    "recaptcha",
    "hcaptcha",
    "payTR",
    "sendNotification",
    "speedAnalytics"
];

// PLUGINS Kısmı api dan çekilecek

(async () => {
    siteData = await siteModel.findOne({});
    let loaded_plugins = [];
    const commandFiles = await globPromise(`${process.cwd()}/plugins/**/*.js`);
    commandFiles.map((value) => {
        const file = require(value);
        if (!file.name) return;
        if(!plugins.includes(file.name)) return console.log(`[Plugin] ${file.name} isimli plugin yuklenemedi. Eklenti'nin Yüklenmesi İçin Lütfen Sitemiz'den Satın Alın.`.red);
        if (loaded_plugins.includes(file.name)) return console.log(`[Plugin] ${file.name} isimli plugin zaten yuklu.`.red);
        console.log(`[Plugin] Yapımcı: ${file.author}, ${file.name}(${file.version}) yuklendi.`.green);
        global[file.name] = file;
        loaded_plugins.push(file.name);
    });
    console.log(`[Plugin] Toplam ${loaded_plugins.length} adet plugin yuklendi.`.green);
})();
//////////////////////////// ---- ////////////////////////////

(async () => {
    let site = await siteModel.countDocuments();
    if (site == 0) {
        console.log(`[Site] Site verileri bulunamadı. Yeni site verileri oluşturuluyor.`.red);
        new siteModel({}).save();
    }
    
    setTimeout(async () => {
        siteData = await siteModel.findOne({});
        sitePages = await siteData.site.pages;
        siteAdmins = await userModel.find({ role: "admin" });
        setInterval(async () => {
            siteData = await siteModel.findOne({});
            sitePages = await siteData.site.pages;
            siteAdmins = await userModel.find({ role: "admin" });
        //}, 60 * 1000 * 5);
        }, 7000); // Test Modu Oldugu Icin 7 Saniyede Bir Cekiyor.
        require('./routers/routes.js')(this);

    }, 2000);
})();


//////////////////////////// ---- ////////////////////////////

require('./cron/jobs.js')(this);

app.listen(config.port, function () {
    console.log(`SpeedSmm V3 Scripti ${config.port} portunda calisiyor.`);
});
