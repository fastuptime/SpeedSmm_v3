const analytics = new Schema({
    categorys: [{}]
});

module.exports = mongoDB.model('analytics', analytics);

/*
        
categorys: [
    { 
        category: 'category',
        yearly: [
            2020: [
                monthly: [
                    {
                        month: moment().format('MMMM'), // Ocak
                        daily: [
                            {
                                date: moment().format('DD MMMM YYYY'), // 01 Ocak 2020
                                value: 0
                            },
                            {
                                date: moment().format('DD MMMM YYYY'), // 02 Ocak 2020
                                value: 0
                            }
                        ]
                    },
                    {
                        month: moment().format('MMMM'), // Şubat
                        daily: [
                            {
                                date: moment().format('DD MMMM YYYY'), // 01 Şubat 2020
                                value: 0
                            },
                            {
                                date: moment().format('DD MMMM YYYY'), // 02 Şubat 2020
                                value: 0
                            }
                        }
                    }
                ]
            ],
            2021: [
                ...
            ]
        ]
    }, 
    ]
        
*/