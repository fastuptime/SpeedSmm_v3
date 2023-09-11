let delay = ms => new Promise(res => setTimeout(res, ms));

module.exports = {
    name: "speedAnalytics",
    version: "1.0.0",
    author: "Can",
    run: async function (category, value) {
        if (!category || !value) {
            console.log("[Plugin] speedAnalytics isimli plugin çalıştırılamadı. Eksik parametreler var.".red);
            return;
        }

        let analytics = await analyticsModel.findOne({});
        if (!analytics) {
            await new analyticsModel({}).save();
            analytics = await analyticsModel.findOne({});
        }
        if (!analytics) {
            await delay(5000);
            analytics = await analyticsModel.findOne({});
        }

        let categoryItem = analytics.categorys.find(item => item.category === category);
        if (!categoryItem) {
            categoryItem = {
                category: category,
                yearly: []
            };
            analytics.categorys.push(categoryItem);
        }

        let currentYear = moment().format('YYYY');
        let yearItem = categoryItem.yearly.find(item => item.year === currentYear);
        if (!yearItem) {
            yearItem = {
                year: currentYear,
                monthly: []
            };
            categoryItem.yearly.push(yearItem);
        }

        let currentMonth = moment().format('MMMM');
        let monthItem = yearItem.monthly.find(item => item.month === currentMonth);
        if (!monthItem) {
            monthItem = {
                month: currentMonth,
                daily: []
            };
            yearItem.monthly.push(monthItem);
        }

        let currentDate = moment().format('DD MMMM YYYY');
        let dateItem = monthItem.daily.find(item => item.date === currentDate);
        if (!dateItem) {
            dateItem = {
                date: currentDate,
                value: 0
            };
            monthItem.daily.push(dateItem);
        }

        dateItem.value += value;

        await analyticsModel.updateOne({}, { $set: { categorys: analytics.categorys } });
    }
};