module.exports = function () {
    cron.schedule('*/15 * * * *', () => {
        fastexchange.run();
        console.log(`[CRON] Fast Exchange API islemi baslatildi.`.yellow);
    });
}