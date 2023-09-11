const childpanel = new Schema({
    userID: { type: String, required: true }, // Kullanıcı ID 24 karakter
    id: { type: String, required: true, default: () => { return parseInt(crypto.randomBytes(4).toString('hex'), 16).toString().substr(0, 6) } }, // 6 karakterli ID, Sipariş ID'si
    admin: {
        username: { type: String, required: true },
        password: { type: String, required: true },
    },
    info: {
        site: {
            domain: { type: String, required: true },
            status: { type: String, required: true, default: 'active' }, // active, deactive, deleted, suspended, installing
            currency: { type: String, required: true, default: 'TRY' },
        },
        autoPayment: { type: Boolean, required: true, default: false }, // Otomatik ödeme aktif mi? Para yeterliyse otomatik ödeme yapar. Yeterli değilse ödeme yapmaz. Ve kapanır.
        monthlyPrice: { type: Number, required: true, default: () => { return siteData.site.modules.childPanel.price } },
        nextPayment: { type: String, required: true, default: () => { return moment().add(1, 'months').format('YYYY-MM-DD HH:mm:ss') } },
        created: { type: String, default: () => { return moment().format('YYYY-MM-DD HH:mm:ss') } },
    },
});

module.exports = mongoDB.model('childpanel', childpanel);