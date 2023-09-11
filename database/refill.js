const refill = new Schema({
    userID: { type: String, required: true },
    url: { type: String, required: true }, // Refill in gönderileceği link
    refillID: { type: String, default: () => { return Math.floor(100000 + Math.random() * 900000) } }, // Refill ID
    orderID: { type: String, required: true }, // Sipariş ID
    serviceName: { type: String, required: true }, // Servis adı
    status: { type: String, default: 'pending' }, // (pending (beklemede), processing (işleniyor), completed (tamamlandı), cancelled (iptal edildi), partial (kısmi))
    completedTime: { type: String, default: '' }, // Refill in tamamlandığı tarih
    date: { type: String, default: () => { return moment().format('DD MMMM YYYY HH:mm:ss') } },

});

module.exports = mongoDB.model('refill', refill);