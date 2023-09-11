const order = new Schema({
    userID: { type: String, required: true },
    order: {
        url: { type: String, required: true }, // Sipariş in gönderileceği link
        id: { type: String, default: () => { return Math.floor(100000 + Math.random() * 900000) } }, // Sipariş ID sitenin gözüken orderID si
        startCount: { type: Number, required: true }, // Başlangıç sayısı (adet)
        remain: { type: Number, required: true }, // Kalan sayı (adet)
        quantity: { type: Number, required: true }, // Miktar (adet)
        status: { type: String, default: 'pending' }, // (pending (beklemede), processing (işleniyor), completed (tamamlandı), cancelled (iptal edildi), partial (kısmi))
        refill: { type: Boolean, default: false }, // Refill sipariş mi?
    },
    price: {
        amount: { type: Number, required: true }, // Tutar
        oldBalance: { type: Number, required: true }, // Eski bakiye
        currency: { type: String, default: 'TRY' }, // TRY, USD, EUR, etc.
    },
    service: {
        id: { type: String, required: true },
        orderID: { type: String, required: true }, // Sipariş ID servisin gözüken orderID si
        name: { type: String, required: true },
        amount: { type: Number, required: true }, // Servise ödenen tutar
        currency: { type: String, default: 'TRY' }, // TRY, USD, EUR, etc. (service.currency) Servisin para birimi
        lastCheck: { type: String, default: () => { return moment().format('DD MMMM YYYY HH:mm:ss') } }, // Son kontrol tarihi
    },
    completedTime: { type: String, default: '' }, // Siparişin tamamlandığı tarih
    averageTime: { type: String, default: '' }, // Ortalama tamamlanma süresi (Siparişin tamamlandığı tarih - Siparişin oluşturulduğu tarih)
    date: { type: String, default: () => { return moment().format('DD MMMM YYYY HH:mm:ss') } },

});

module.exports = mongoDB.model('order', order);