module.exports = function () {
    (async () => {
        let loaded_crons = [];
        const commandFiles = await globPromise(`${process.cwd()}/cron/job/*.js`);
        commandFiles.map((value) => {
            const file = require(value);
            let name = value.split('/').pop().split('.')[0];
            if (!name) return;
            if (loaded_crons.includes(name)) return console.log(`[CRON] ${name} isimli cron zaten yuklu.`.red);
            console.log(`[CRON] ${name} yuklendi.`.yellow);
            require(value)(this);
            loaded_crons.push(name);
        });
        console.log(`[CRON] Toplam ${loaded_crons.length} adet cron yuklendi.`.yellow);
    })();
}