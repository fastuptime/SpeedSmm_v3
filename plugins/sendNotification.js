module.exports = {
    name: "sendNotification",
    version: "1.0.0",
    author: "Can",
    run: async function (zusers, datax) {
    if (!zusers || !datax) return { status: false, message: "Lütfen tüm alanları doldurunuz 1." }
    if(!datax.title || !datax.message) return { status: false, message: "Lütfen tüm alanları doldurunuz. 2" }
    
        zusers.forEach(async (user) => {
        if(!user._id) return;

        let userx = await userModel.findOne({ _id: user._id });

        if (userx) {

            new notificationModel({
                userID: user._id,
                title: datax.title,
                message: datax.message,
                icon: datax?.icon || "fas fa-bell",
                url: datax?.url || "#",
            }).save();
        }

    });

    return { status: true, message: "Bildirim başarıyla gönderildi." }
    }
};