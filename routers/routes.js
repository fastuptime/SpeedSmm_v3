module.exports = async function() {
    app.use((req, res, next) => {
        res.locals.siteData = siteData;
        res.locals.sitePages = sitePages;
        res.locals.theme = req.cookies?.theme || "dark";
        i18n.setLocale(req, req.cookies?.lang || 'tr');
        res.locals.__ = i18n.__;
        next();
    });

    app.use((req, res, next) => {
        const host = req.headers['x-forwarded-host'] || req.hostname; // Sitenin domainini alıyoruz
        //LISANS KONTROL SON AŞAMA'DA EKLENECEK
        next();
    });

    require("../functions/middleware.js")(this);
    app.use("/api/v1", require("./api/api.js"));
    app.use("/admin", require("./admin/index.js"));
    app.use("/auth", require("./client/auth.js"));
    app.use("/", require("./client/index.js"));
};