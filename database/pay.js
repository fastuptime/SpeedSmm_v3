const pay = new Schema({
    userID: { type: String, required: true }, // 24 karakterli user ID
    transactionID: { type: String, default: '' }, // PayTR, PayMax, Iyzico etc. transaction ID
    id: { type: String, required: true, default: () => { return Math.floor(100000 + Math.random() * 900000) } },
    amount: { type: Number, required: true }, // Tutar
    oldBalance: { type: Number, required: true }, // Eski bakiye
    method: { type: String, required: true }, // (PayTR, PayMax, Iyzico, Bank Transfer, etc.)
    bank: {
        bankName: { type: String, default: '' }, // Banka adı
        name: { type: String, default: '' }, // Ödeme yapanın adı
    },
    admin: {
        status: { type: Boolean, default: false }, // Admin tarafından yapılan bir işlem mi?
        id: { type: String, default: '' }, // Admin ID
        action: { type: String, default: '' }, // Admin tarafından yapılan işlem (Örnek: Bakiye ekleme => addBalance, Bakiye çıkarma => removeBalance, Ödeme onaylama => approvePayment, Ödeme reddetme => rejectPayment, etc.)
    },
    note: { type: String, default: '' }, // Not
    currency: { type: String, default: 'TRY' }, // TRY, USD, EUR, etc.
    status: { type: String, default: 'pending' }, // (pending, success, failed)
    lastUpDt: { type: String, default: () => { return moment().format('DD MMMM YYYY HH:mm:ss') } }, // Son güncelleme tarihi işlem başarılı veya başarısız olsa bile güncellenir.
    date: { type: String, default: () => { return moment().format('DD MMMM YYYY HH:mm:ss') } },
});

module.exports = mongoDB.model('pay', pay);