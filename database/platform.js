const platforms = new Schema({
    id: { type: Number, required: true }, // platforms ID
    queue: { type: Number, required: true }, // platforms sırası 
    name: { type: String, required: true }, // platforms adı
    visible: { type: Boolean, required: true }, // platforms görünürlüğü
});

module.exports = mongoDB.model('platforms', platforms);