const ticket = new Schema({
    userID: { type: String, required: true },
    id: { type: String, required: true, default: () => { return parseInt(crypto.randomBytes(4).toString('hex'), 16).toString().substr(0, 6) } }, 
    subject: { type: String, required: true },
    status: { type: String, default: 'pending' }, // (pending, answered, resolved, closed)
    messages: { type: Array, default: [] }, // { sender: "", message: "", person: "user", date: "" } gibi
    updated_at: { type: String, default: () => { return moment().format('DD MMMM YYYY HH:mm:ss') } },
    created_at: { type: String, default: () => { return moment().format('DD MMMM YYYY HH:mm:ss') } },
});

module.exports = mongoDB.model('ticket', ticket);