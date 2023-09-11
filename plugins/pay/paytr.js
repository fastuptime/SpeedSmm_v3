module.exports = {
    name: "payTR",
    version: "1.0.0",
    author: "Can",
    run: async function (app, data) {
        if(!data.name || !data.price || !data.currency || !data.email) return { status: false, message: "Lütfen Tüm Alanları Doldurunuz" }
        if(!siteData.virtualPos.payTr.status) return { status: false, message: "PayTR Sanal Posu Aktif Değil" }
        if(!siteData.virtualPos.payTr.merchantId || !siteData.virtualPos.payTr.merchantKey || !siteData.virtualPos.payTr.merchantSalt) return { status: false, message: "PayTR Sanal Posu Bilgileri Eksik" }
        if(siteData.virtualPos.payTr.minPrice > data.price) return { status: false, message: `Minimum ${siteData.virtualPos.payTr.minPrice} ${data.currency} Olarak Ödeme Yapabilirsiniz` }
        if(siteData.virtualPos.payTr.maxPrice < data.price) return { status: false, message: `Maximum ${siteData.virtualPos.payTr.maxPrice} ${data.currency} Olarak Ödeme Yapabilirsiniz` }
        if(isNaN(data.price)) return { status: false, message: "Lütfen Geçerli Bir Fiyat Giriniz" }
        /*
        payTR.run(app, {
            name: "Test Ürünü",
            price: 2,
            currency: "TL",
            email: "mail"
        }).then((data) => { 
            console.log(data);
        });
        */
        var name = data.name; // Ürün adı
        //price commission, 100 commission 110 total
        var price = data.price + (data.price * siteData.virtualPos.payTr.commission / 100); // Ürün fiyatı (TL cinsinden)
        price = price * 100; // Ürün fiyatı (TL cinsinden)
        var currency = data.currency;  //TL - USD - EUR - GBP gönderilebilir.
        var max_installment = '1'; // 2 - 12 arası gönderilebilir. 1 gönderilirse bireysel kartlar taksit yapılamaz.

        var link_type = 'product';
        var lang = 'tr'; //tr veya en gönderilebilir.
        var get_qr = '1';
        var email = data.email;
        var min_count = '1';
        var required = name + price + currency + max_installment + link_type + lang + min_count;
        var max_count = '1';


        var expiry_date = moment().add(30, 'days').format('YYYY-MM-DD HH:mm:ss');

        var callback_link = `${siteData.site.integrations.seo.url}/payments/paytr`;

        var callback_id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15); 

        var debug_on = '1'; //Entegrasyon hatalarını alabilmek için 1 olarak bırakın.

        var paytr_token = crypto.createHmac('sha256', siteData.virtualPos.payTr.merchantKey).update(required + siteData.virtualPos.payTr.merchantSalt).digest('base64');

        var options = {
            method: 'POST',
            url: 'https://www.paytr.com/odeme/api/link/create',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify({
                'merchant_id': siteData.virtualPos.payTr.merchantId,
                'name': name,
                'price': price,
                'currency': currency,
                'max_installment': max_installment,
                'link_type': link_type,
                'lang': lang,
                'get_qr': get_qr,
                'min_count': min_count,
                'email': email,
                'expiry_date': expiry_date,
                'max_count': max_count,
                'callback_link': callback_link,
                'callback_id': callback_id,
                'debug_on': debug_on,
                'paytr_token': paytr_token,
            })
        };

        let x = await axios(options);
        if(x.data.status == "success") return { status: true, message: "Ödeme Başarıyla Oluşturuldu", data: x.data };
        else return { status: false, message: "Ödeme Oluşturulurken Bir Hata Oluştu", data: x.data };
    }
};