const user = new Schema({
    id: { type: Number, default: () => { return Math.floor(1000000 + Math.random() * 9000000) } }, // Kullanıcı ID'si (6 haneli)
    username: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    password: { type: String, required: true },
    balance: { type: Number, default: 0 }, // Bakiye
    spent: { type: Number, default: 0 }, // Harcanan
    role: { type: String, default: 'user' }, // Kullanıcı rolü (user, support, admin)
    mail: {
        address: { type: String, default: '' },
        verified: { type: Boolean, default: false },
        code: { type: String, default: () => { return crypto.randomBytes(12).toString('hex') } }, // Doğrulama kodu (12 haneli)
    },
    phone: {
        number: { type: String, default: '' },
        verified: { type: Boolean, default: false },
        code: { type: String, default: () => { return Math.floor(100000 + Math.random() * 900000) } }, // Doğrulama kodu (6 haneli)
    },
    ref: {
        ref_code: { type: String, default: () => { crypto.randomBytes(4).toString('hex') } }, // Referans kodu (4 haneli)
        reffered: { type: Number, default: 0 }, // Kaç kişiye referans olduğu
        clicks: { type: Number, default: 0 }, // Kaç kişi referans linkine tıkladı
        earned: { type: Number, default: 0 }, // Toplam kazanç
        withdraw: { type: Number, default: 0 }, // Çekilen tutar
        reffered_users: { type: Array, default: [] }, // Kime referans olduğu
        reffered_by: { type: String, default: "" }, // Kimin referansı olduğu
    },
    ban: {
        status: { type: Boolean, default: false }, // Ban durumu
        reason: { type: String, default: '' }, // Ban sebebi
        admin: { type: String, default: '' }, // Banlayan admin
        date: { type: String, default: '' }, // Ban tarihi
    },
    alert: { // Buradaki tüm uyarılar mail olarak gönderilir
        successOrder: { type: Boolean, default: true }, // Sipariş başarılı olduğunda
        failedOrder: { type: Boolean, default: true }, // Sipariş başarısız olduğunda
        lowBalance: {
            status: { type: Boolean, default: true }, // Bakiye düşük olduğunda
            amount: { type: Number, default: 10 }, // Bakiye düşük olduğunda gönderilecek miktar
        },
        replyTicket: { type: Boolean, default: true }, // Ticket cevaplandığında
    },
    banHistory: { type: Array, default: [] }, // Ban geçmişi { admin: "", reason: "", date: "" } gibi
    apiKey: { type: String, default: () => { return crypto.randomBytes(24).toString('hex') } }, // Api key
    lang: { type: String, default: 'tr' },
    time_zone: { type: String, default: 'Europe/Istanbul' },
    logs: { type: Array, default: [] }, // Kullanıcı logları { ip: "", date: "", action: "Login", status: "Success", details: "", userID: "" } gibi
    last_login: { type: String, default: () => { return moment().format('DD MMMM YYYY HH:mm:ss') } },
    created_at: { type: String, default: () => { return moment().format('DD MMMM YYYY HH:mm:ss') } },
});

module.exports = mongoDB.model('user', user);