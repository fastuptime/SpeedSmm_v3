const notification = new Schema({
    userID: { type: String, required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, default: 'unread' }, // (unread, read)
    date: { type: String, default: () => { return moment().format('DD MMMM YYYY HH:mm:ss') } },
});

module.exports = mongoDB.model('notification', notification);