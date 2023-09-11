module.exports =  {
    name: "fastexchange",
    version: "1.0.0",
    author: "Can",
    run: async function () {
        const apiExchange = {
            api: 'https://fastexchangerateapi.fevehex882.repl.co', //Anlık kur bilgileri API Ağı Github Üzerinde yayınladım github.com/fastuptime FastExchangeRateAPI
            key: 'xxxxxxxxxxxxxxxxxxxxxxxxxxx',
        };

        axios.get(`${apiExchange.api}/all?key=${apiExchange.key}`).then((response) => {
            const data = response.data;
            if(data.status) {
                (async () => {
                    await siteModel.updateOne({}, {
                        $set:
                        {
                            "site.exchange_rate.lastUpdate": moment().format('DD.MM.YYYY HH:mm:ss'),
                            "site.exchange_rate.try": data.data.find((x) => x.ID == "try").data,
                            "site.exchange_rate.usd": data.data.find((x) => x.ID == "usd").data,
                            "site.exchange_rate.eur": data.data.find((x) => x.ID == "eur").data,
                            "site.exchange_rate.rub": data.data.find((x) => x.ID == "rub").data,
                            "site.exchange_rate.inr": data.data.find((x) => x.ID == "inr").data,
                        }
                    });
                })()
            }
        }).catch((err) => {
            console.log(err);
        });
    }
};