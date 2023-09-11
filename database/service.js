const service = new Schema({
    id: { type: Number, required: true }, // Servis ID
    name: { type: String, required: true }, // Servis adı
    category: { type: Number, required: true }, // Servis kategorisi ID
    price: { type: Number, required: true }, // Servis fiyatı
    min: { type: Number, required: true }, // Minimum sipariş miktarı
    max: { type: Number, required: true }, // Maximum sipariş miktarı
    type: { type: String, default: 'Default' }, // (default, custom, subscription)
    refill: { type: Boolean, default: false }, // Refill özelliği (true, false)
    service: {
        apiID: { type: String, required: true }, // Servisin API ID si
        serviceID: { type: String, required: true }, // Servisin ID si
        amount: { type: Number, required: true }, // Servisin fiyatı
    },
    lastCheck: { type: String, default: () => { return moment().format('DD MMMM YYYY HH:mm:ss') } }, // Son kontrol tarihi
    status: { type: Boolean, default: true }, // Servis durumu (true, false)
});

module.exports = mongoDB.model('service', service);