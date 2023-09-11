const config = require("../config");

const site = new Schema({
    site: {
        favicon: { type: String, default: 'https://i.hizliresim.com/oimxgk4.png' },
        currency: { type: String, default: 'TRY' }, // TRY, USD, EUR, etc. (service.currency) Servisin para birimi
        apiStatus: { type: Boolean, default: true }, // API kullanımı açık mı?
        forgotPassword: { type: Boolean, default: true }, // Şifremi unuttum özelliği açık mı?
        registerAgreement: { type: Boolean, default: false }, // Kayıt sözleşmesi açık mı?
        salesAgreement: { type: Boolean, default: false }, // Satış sözleşmesi açık mı?
        text: {
            terms: { type: String, default: '<h2>Kullanım Koşulları</h2> Lütfen speedsmm.com dan hizmet satın almadan önce aşağıdaki koşulları dikkatlice okuyun. speedsmm.com a kayıt olup, hizmetlerini kullanarak tüm koşulları okuduğunuzu, anladığınızı ve kabul ettiğinizi beyan edersiniz. Bu hüküm ve koşulları kabul etmiyorsanız lütfen speedsmm.com hizmetlerini kullanmayın. <br> <h2>Genel Şartlar</h2> ● Varsayılan minimum ödeme tutarı 10TLdir. <br> ● speedsmm.com servis fiyatlarını önceden haber vermeksizin herhangi bir zamanda değiştirebilir. Ödeme / Geri Ödeme politikası sabit kalır. <br> ● speedsmm.com herhangi bir hizmet için teslimat süresini garanti etmez. Servislerde yazılı olan başlama süreleri belirttimiz en yakın tahminlerdir. <br> ● 1 Link için aynı anda sadece 1 sipariş girilebilir, 2 sipariş birden girildiğinde eksik gönderimler olabilir, sorumlusu speedsmm.com değildir. <br> ● speedsmm.com Instagram, Facebook, Twitter veya sunduğu herhangi bir hizmet için, işlem yapılan hesabın askıya alınması, kapatılması gibi olası durumlarda mesuliyet kabul etmez. <br> ● Kullanmakta olduğunuz web sitesi üzerinden elektronik ortamda sipariş verdiğiniz takdirde, size sunulan ön bilgilendirme formunu ve mesafeli satış sözleşmesini kabul etmiş sayılırsınız. <br> ● Tüm sistem üyelerine e-mail ve cep telefonuna çok sık olmamak kaydı ile sistemimiz hakkında bilgilendirici mesajlar gönderilebilir. Sisteme üye olarak tarafımıza iletişim hakkı vermiş olursunuz. <br> ● Her servise verilen limit, hesap başına verilen limittir. Max 3k limitli bir servisten yararlanan hesap 4k çekim yapamaz. <br> ● Ürünlerin karşılarında belirtilen ücretler 1.000 (1K) ücretidir. <br> ● speedsmm.com Tarafından sisteme kayıt olan her kullanıcının telefon numarasına istenildiği zaman mesaj gönderme hakkına sahiptir. <br> <h2>Hizmet Şartları</h2> ● speedsmm.com İnstagram/Twitter/Facebook veya başka bir Sosyal Medya hesabı için sadece "Görünüm" artırmaya yardımcı olmak için kullanılacaktır. <br> ● speedsmm.com yeni takipçiler ve etkileşim garantisi vermez, sadece ödeme yapılarak alınan miktarı garanti eder. <br> ● Tüm bot hesapları gerçek görünüme dönüştürmek için çalışıyoruz, ancak hesaplarımızın %100 profil resimli, biyografili ve paylaşımlı hesaplar olacağının garantisini vermiyoruz. <br> ● Gizli hesaplara işlem yapıldığında sorumluluk üyeye aittir. Sipariş vermeden önce lütfen hesabın herkese açık olduğundan emin olun. <br> <h2>İade Şartları</h2> ● Yapılan ödemelerde geri iade mümkün değildir, speedsmm.com hizmetlerinde kullanılması gerekir. <br> ● Instagram/Twitter/Facebook vb. servislerin ne zaman güncelleme yapabileceğini bilemeyiz, herhangi bir düşüş yaşanması halinde servis sağlayıcısı telafi yapmadığı sürece iade yapılamaz. <br> ● Siparişler sisteme girildikten sonra iptal/iade talebiniz kabul edilmeyecektir. Eğer sipariş tamamlanmazsa/kısmen tamamlanırsa sistem otomatik olarak geri ödeme yapacaktır. <br> ● speedsmm.com yapılan ödemelerde herhangi bir ters ibraz, geri çekme söz konusu olursa üyeyi uzaklaştırma hakkını saklı tutar. <br> ● Yetkisiz işlem veya çalıntı kredi kartı, herhangi bir hileli faliyette üye hesabı istisnasız kapatılacaktır. <br> <h2>Gizlilik Politikası</h2> ● Bu politika kişisel bilgilerinizin nasıl kullanacağını kapsar. Gizliliğiniz bizim için önemlidir ve korumak için her türlü önlem alınmaktadır. <br> ● Sisteme girilen tüm bilgiler şifreli ve güvenli sunucularda barındırılır. <br> ● Bilgileriniz hiçbir şekilde 3. kişiler ile paylaşılmaz. speedsmm.com bildirimde bulunmaksızın Hizmet Şartlarını değiştirme hakkını saklı tutar <h1>Kullanım Sözleşmesi</h1> Lütfen speedsmm.comdan hizmet satın almadan önce aşağıdaki koşulları dikkatlice okuyun. speedsmm.coma kayıt olup, hizmetlerini kullanarak tüm koşulları okuduğunuzu, anladığınızı ve kabul ettiğinizi beyan edersiniz. Bu hüküm ve koşulları kabul etmiyorsanız lütfen speedsmm.com hizmetlerini kullanmayın. <h3>1. Genel</h3> ● speedsmm.comdan aldığınız tüm hizmetlerin sorumluluğu size aittir.<br> ● TAKİPÇİ ATILIMI SONRASI PROFİLDE OLUŞACAK KAPANMA VEYA DÜŞÜŞLERDEN speedsmm.com SORUMLU DEĞİLDİR.<br> ● Varsayılan minimum ödeme tutarı 5TLdir.<br> ● speedsmm.com servis fiyatlarını önceden haber vermeksizin herhangi bir zamanda değiştirebilir. Ödeme / Geri Ödeme politikası sabit kalır.<br> ● speedsmm.com herhangi bir hizmet için teslimat süresini garanti etmez. Servislerde yazılı olan başlama süreleri belirttimiz en yakın tahminlerdir.<br> ● 1 Link için aynı anda sadece 1 sipariş girilebilir, 2 sipariş birden girildiğinde eksik gönderimler olabilir, sorumlusu speedsmm.com değildir.<br> ● speedsmm.com Instagram, Facebook, Twitter veya sunduğu herhangi bir hizmet için, işlem yapılan hesabın askıya alınması, kapatılması gibi olası durumlarda mesuliyet kabul etmez.<br> ● Tüm sistem üyelerine e-mail ve cep telefonuna çok sık olmamak kaydı ile sistemimiz hakkında bilgilendirici mesajlar gönderilebilir. Sisteme üye olarak tarafımıza iletişim hakkı vermiş olursunuz.<br> ● Her servise verilen limit, hesap başına verilen limittir. Max 3k limitli bir servisten yararlanan hesap 4k çekim yapamaz.<br> ● Ürünlerin karşılarında belirtilen ücretler 1.000 (1K) ücretidir.<br> ● Garantili servislerde servis kapanır veya sağlayıcıya ulaşılamaması gibi durumlarda telafi sorumluluğu kesinlikle tarafımıza ait değildir.<br> <h3>2. Hizmet</h3> ● speedsmm.com İnstagram/Twitter/Facebook veya başka bir Sosyal Medya hesabı için sadece "Görünüm" artırmaya yardımcı olmak için kullanılacaktır.<br> ● speedsmm.com yeni takipçiler ve etkileşim garantisi vermez, sadece ödeme yapılarak alınan miktarı garanti eder.<br> ● Tüm bot hesapları gerçek görünüme dönüştürmek için çalışıyoruz, ancak hesaplarımızın %100 profil resimli, biyografili ve paylaşımlı hesaplar olacağının garantisini vermiyoruz.<br> ● Gizli hesaplara işlem yapıldığında sorumluluk üyeye aittir. Sipariş vermeden önce lütfen hesabın herkese açık olduğundan emin olun.<br> ● Siparişlerin tamamlanması 48 - 72 saati bulabilir. (bu süre duruma göre uzayabilir ve kısalabilir.)<br> ● Garantili servislerde servis kapanır veya sağlayıcıya ulaşılamaması gibi durumlarda telafi sorumluluğu kesinlikle tarafımıza ait değildir.<br>' }, // Kullanım koşulları  
            invite: {
                type: String, default: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'}
        },
        code: {
            header: { type: String, default: '' }, // Header kodu
            footer: { type: String, default: '' }, // Footer kodu
        },
        exchange_rate: {
            lastUpdate: { type: String, default: () => moment().format('DD.MM.YYYY HH:mm:ss') }, // Son güncelleme tarihi
            try: {
                usd: { type: Number, default: 0.053 }, // TRY kuru (USD)
                eur: { type: Number, default: 0.043 }, // TRY kuru (EUR)
                rub: { type: Number, default: 3.85 }, // TRY kuru (RUB)
                inr: { type: Number, default: 3.85 }, // TRY kuru (INR)
            },
            usd: {
                try: { type: Number, default: 19.00 }, // USD kuru (TRY)
                eur: { type: Number, default: 0.82 }, // USD kuru (EUR)
                rub: { type: Number, default: 73.00 }, // USD kuru (RUB)
                inr: { type: Number, default: 73.00 }, // USD kuru (INR)
            },
            eur: {
                try: { type: Number, default: 23.00 }, // EUR kuru (TRY)
                usd: { type: Number, default: 1.22 }, // EUR kuru (USD)
                rub: { type: Number, default: 89.00 }, // EUR kuru (RUB)
                inr: { type: Number, default: 89.00 }, // EUR kuru (INR)
            },
            rub: {
                try: { type: Number, default: 0.26 }, // RUB kuru (TRY)
                usd: { type: Number, default: 0.014 }, // RUB kuru (USD)
                eur: { type: Number, default: 0.011 }, // RUB kuru (EUR)
                inr: { type: Number, default: 0.88 }, // RUB kuru (INR)
            },
            inr: {
                try: { type: Number, default: 0.26 }, // INR kuru (TRY)
                usd: { type: Number, default: 0.014 }, // INR kuru (USD)
                eur: { type: Number, default: 0.011 }, // INR kuru (EUR)
                rub: { type: Number, default: 0.88 }, // INR kuru (RUB)
            }
        },
        support: {
            status: { type: Boolean, default: true }, // Destek sistemi açık mı?
            maxTicket: { type: Number, default: 5 }, // Aynı anda açık olabilecek maksimum ticket sayısı (0 = sınırsız)
            subjects: { type: Array, default: ['Genel', 'Ödeme', 'Sipariş', 'Panel Kiralama', 'Diğer'] }, // Destek talebi konuları
            reasons_for_request: { type: Array, default: [
                'Mümkünse iptal, iade veya değişim yapmak istiyorum.',
                'Siparişim hala tamamlanmadı.',
                'Siparişimde düşüş var.',
                'Siparişimde hata olduğunu düşünüyorum.',
                'Tamamlandı olarak gözüküyor ancak tamamlanmadı.',
                'Siparişimdeki gönderim hızı çok yavaş.',
                'Diğer'
            ]
            },
        },
        maintenance: {
            status: { type: Boolean, default: false }, // Bakım modu açık mı?
            message: { type: String, default: 'Bakım modu aktif. Lütfen daha sonra tekrar deneyiniz.' }, // Bakım modu mesajı
        },
        number: {
            status: { type: Boolean, default: false }, // Numara doğrulama açık mı?
            numberArea: { type: Boolean, default: false }, // Numara alanı gösterilsin mi? (number.status = true ise gösterilsin olacak)
            sender: {
                service: { type: String, default: 'netgsm' }, // (netgsm, iletimerkezi, bizimsms) SMS servisi
                username: { type: String, default: '' }, // kullanıcı adı
                password: { type: String, default: '' }, // şifre
                header: { type: String, default: 'SpeedSMM' }, // başlık en az 3 en fazla 11 karakter olmalı marka adı olabilir
            }
        },
        mail: {
            status: { type: Boolean, default: false }, // Mail doğrulama açık mı?
            title: { type: String, default: 'SpeedSMM - Hoş Geldiniz!' }, // Mail başlığı
            template: { type: String, default: 'Hoş geldiniz, {name}! Hesabınızı aktifleştirmek için lütfen aşağıdaki linke tıklayınız: {link}' }, // Mail şablonu
            smtp: {
                host: { type: String, default: '' }, // SMTP host
                port: { type: Number, default: 587 }, // SMTP port
                secure: { type: Boolean, default: false }, // SMTP secure
                auth: {
                    user: { type: String, default: '' }, // SMTP kullanıcı adı
                    pass: { type: String, default: '' }, // SMTP şifre
                },
            }
        },
        adminInfo: {
            mail: { type: String, default: '' }, // Admin mail adresi
            phone: { type: String, default: '' }, // Admin telefon numarası
            company: { type: String, default: '' }, // Admin kurumsal bilgileri
        },
        service: {
            averageTime: { type: Boolean, default: false }, // Servisin ortalama işlem süresi gösterilsin mi?
            listVisible: { type: Boolean, default: true }, // Servis listesini kimler görebilir (true = herkes, false = sadece giriş yapmış kullanıcılar)
            autoRefill: { type: Boolean, default: false }, // Otomatik yenileme sistemi açık mı? false ise kullanıcılar yenileme yapmadığı sürece yenileme yapılmaz.
            /*
            autoRefill sadece instagram için yapılacak. instagram a gidip kontrol edecek.
            200 den az ise düşüş autoRefill olmayacak.
            */
        },
        pages: {
            newOrder: {
                queue: { type: Number, default: 1 }, // Sayfanın sırası
                url: { type: String, default: '/new_order' }, // Yeni sipariş sayfası url
                icon: { type: String, default: '<i class="fa-solid fa-cart-plus"></i>' }, // Sayfa için icon
                i18n: { type: String, default: 'newOrder' }, // Sayfa için i18n
                description: { type: String, default: 'Sipariş vermek için lütfen aşağıdaki formu doldurunuz.' }, // Yeni sipariş sayfası açıklaması
            },
            orders: {
                queue: { type: Number, default: 2 }, // Sayfanın sırası
                url: { type: String, default: '/orders' }, // Siparişlerim sayfası url
                icon: { type: String, default: '<i class="bi bi-bar-chart-steps"></i>' }, // Sayfa için icon
                i18n: { type: String, default: 'orders' }, // Sayfa için i18n
                description: { type: String, default: 'Siparişlerinizi aşağıdaki tablodan takip edebilirsiniz.' }, // Siparişlerim sayfası açıklaması
            },
            services: {
                queue: { type: Number, default: 3 }, // Sayfanın sırası
                url: { type: String, default: '/services' }, // Servisler sayfası url
                icon: { type: String, default: '<i class="menu-icon bi bi-sort-up-alt"></i>' }, // Sayfa için icon
                i18n: { type: String, default: 'services' }, // Sayfa için i18n
                description: { type: String, default: 'Servislerimizi aşağıdaki tablodan inceleyebilirsiniz.' }, // Servisler sayfası açıklaması
            },
            refill: {
                queue: { type: Number, default: 4 }, // Sayfanın sırası
                url: { type: String, default: '/refill' }, // Otomatik yenileme sayfası url
                icon: { type: String, default: '<i class="menu-icon fa-solid fa-plus"></i>' }, // Sayfa için icon
                i18n: { type: String, default: 'refill' }, // Sayfa için i18n
                description: { type: String, default: 'Otomatik yenileme sistemi ile siparişlerinizin yenilenmesini sağlayabilirsiniz.' }, // Otomatik yenileme sayfası açıklaması
            },
            balance_load: {
                queue: { type: Number, default: 5 }, // Sayfanın sırası
                url: { type: String, default: '/balance_load' }, // Bakiye yükleme sayfası url
                icon: { type: String, default: '<i class="menu-icon bi bi-credit-card-2-back"></i>' }, // Sayfa için icon
                i18n: { type: String, default: 'balanceload' }, // Sayfa için i18n
                description: { type: String, default: 'Bakiye yüklemek için lütfen aşağıdaki formu doldurunuz.' }, // Bakiye yükleme sayfası açıklaması
            },
            support: {
                queue: { type: Number, default: 6 }, // Sayfanın sırası
                url: { type: String, default: '/support' }, // Destek sayfası url
                icon: { type: String, default: '<i class="fa-solid fa-headset"></i>' }, // Sayfa için icon
                i18n: { type: String, default: 'support' }, // Sayfa için i18n
                description: { type: String, default: 'Destek talebi oluşturmak için lütfen aşağıdaki formu doldurunuz.' }, // Destek sayfası açıklaması
            },
            api: {
                queue: { type: Number, default: 7 }, // Sayfanın sırası
                url: { type: String, default: '/api' }, // API sayfası url
                icon: { type: String, default: '<i class="menu-icon bi bi-bezier2"></i>' }, // Sayfa için icon
                i18n: { type: String, default: 'api' }, // Sayfa için i18n
                description: { type: String, default: 'API ile ilgili bilgilere aşağıdaki tablodan ulaşabilirsiniz.' }, // API sayfası açıklaması
            },
            child_panels: {
                queue: { type: Number, default: 8 }, // Sayfanın sırası
                url: { type: String, default: '/child_panels' }, // Alt panel sayfası url
                icon: { type: String, default: '<i class="fa-solid fa-network-wired"></i>' }, // Sayfa için icon
                i18n: { type: String, default: 'childpanels' }, // Sayfa için i18n
                description: { type: String, default: 'Alt panel sistemi ile müşterilerinize panel açabilirsiniz.' }, // Alt panel sayfası açıklaması
            },
            terms: {
                queue: { type: Number, default: 9 }, // Sayfanın sırası
                url: { type: String, default: '/terms' }, // Kullanım koşulları sayfası url
                icon: { type: String, default: '<i class="menu-icon" data-feather="file-text"></i>' }, // Sayfa için icon
                i18n: { type: String, default: 'terms' }, // Sayfa için i18n
                description: { type: String, default: 'Kullanım koşulları sayfası açıklaması' }, // Kullanım koşulları sayfası açıklaması
            },
            invite: {
                queue: { type: Number, default: 10 }, // Sayfanın sırası
                url: { type: String, default: '/invite' }, // Referans sayfası url
                icon: { type: String, default: '<i class="menu-icon" data-feather="share-2"></i>' }, // Sayfa için icon
                i18n: { type: String, default: 'invite' }, // Sayfa için i18n
                description: { type: String, default: 'Referans sistemi ile arkadaşlarınızı davet ederek para kazanabilirsiniz.' }, // Referans sayfası açıklaması
            },
            account: {
                queue: { type: Number, default: 11 }, // Sayfanın sırası
                url: { type: String, default: '/account' }, // Hesap sayfası url
                icon: { type: String, default: '<i class="fa-solid fa-circle-user"></i>' }, // Sayfa için icon
                i18n: { type: String, default: 'account' }, // Sayfa için i18n
                description: { type: String, default: 'Hesap ayarlarınızı aşağıdaki formdan düzenleyebilirsiniz.' }, // Hesap sayfası açıklaması
            },
            logout: {
                queue: { type: Number, default: 12 }, // Sayfanın sırası
                url: { type: String, default: '/logout' }, // Çıkış sayfası url
                icon: { type: String, default: '<i class="menu-icon bi bi-box-arrow-in-left"></i>' }, // Sayfa için icon
                i18n: { type: String, default: 'logout' }, // Sayfa için i18n
                description: { type: String, default: 'Çıkış sayfası' }, // Çıkış sayfası açıklaması
            }
        },
        modules: { // Modüller
            childPanel: {
                status: { type: Boolean, default: false }, // Alt panel sistemi açık mı?
                price: { type: Number, default: 150 }, // Alt panel sistemi fiyatı
            },
            freeBalance: {
                status: { type: Boolean, default: false }, // Ücretsiz bakiye sistemi açık mı?
                price: { type: Number, default: 0 }, // Ücretsiz bakiye sistemi fiyatı (Kayıt olan kullanıcıya verilecek otomatik)
            },
            referral: {
                status: { type: Boolean, default: false }, // Referans sistemi açık mı?
                bonus: { type: Number, default: 5 }, // Referans sistemi bonusu (10 TL yüklediyse referans sahibine %5 = 0.5 TL bonus verilecek)
                minWithdraw: { type: Number, default: 10 }, // En düşük ne kadar çekim yapılabilir?
                maxAmount: { type: Number, default: 50 }, // En fazla ne kadar a kadar bonus bakiye verilecek?
                limit: { type: Boolean, default: false }, // Referans sistemi limiti (true = her yüklemede, false = sadece ilk yüklemede)
            },
        },
        alert: {
            lowBalance: {
                status: { type: Boolean, default: false }, // Düşük bakiye uyarısı açık mı?
                amount: { type: Number, default: 10 }, // Düşük bakiye uyarısı miktarı (10 TL altında bakiye varsa uyarı gösterilecek)
                sms: {
                    status: { type: Boolean, default: false }, // SMS ile uyarı gönderilsin mi?
                    number: { type: String, default: '' }, // SMS ile uyarı gönderilecek numara
                },
                mail: {
                    status: { type: Boolean, default: false }, // Mail ile uyarı gönderilsin mi?
                    mail: { type: String, default: '' }, // Mail ile uyarı gönderilecek mail adresi
                },
                discordWebhook: {
                    status: { type: Boolean, default: false }, // Discord ile uyarı gönderilsin mi?
                    url: { type: String, default: '' }, // Discord ile uyarı gönderilecek webhook url
                },
                telegram: {
                    status: { type: Boolean, default: false }, // Telegram ile uyarı gönderilsin mi?
                    token: { type: String, default: '' }, // Telegram bot token
                    chatId: { type: String, default: '' }, // Telegram chat id
                },
                lastSent: { type: String, default: moment().format('YYYY-MM-DD HH:mm:ss') }, // Son gönderim tarihi
            },
            newOrder: {
                status: { type: Boolean, default: false }, // Yeni sipariş uyarısı açık mı?
                sms: {
                    status: { type: Boolean, default: false }, // SMS ile uyarı gönderilsin mi?
                    number: { type: String, default: '' }, // SMS ile uyarı gönderilecek numara
                },
                mail: {
                    status: { type: Boolean, default: false }, // Mail ile uyarı gönderilsin mi?
                    mail: { type: String, default: '' }, // Mail ile uyarı gönderilecek mail adresi
                },
                discordWebhook: {
                    status: { type: Boolean, default: false }, // Discord ile uyarı gönderilsin mi?
                    url: { type: String, default: '' }, // Discord ile uyarı gönderilecek webhook url
                },
                telegram: {
                    status: { type: Boolean, default: false }, // Telegram ile uyarı gönderilsin mi?
                    token: { type: String, default: '' }, // Telegram bot token
                    chatId: { type: String, default: '' }, // Telegram chat id
                },
                lastSent: { type: String, default: moment().format('YYYY-MM-DD HH:mm:ss') }, // Son gönderim tarihi
            },
            newTicket: {
                status: { type: Boolean, default: false }, // Yeni destek talebi uyarısı açık mı?
                sms: {
                    status: { type: Boolean, default: false }, // SMS ile uyarı gönderilsin mi?
                    number: { type: String, default: '' }, // SMS ile uyarı gönderilecek numara
                },
                mail: {
                    status: { type: Boolean, default: false }, // Mail ile uyarı gönderilsin mi?
                    mail: { type: String, default: '' }, // Mail ile uyarı gönderilecek mail adresi
                },
                discordWebhook: {
                    status: { type: Boolean, default: false }, // Discord ile uyarı gönderilsin mi?
                    url: { type: String, default: '' }, // Discord ile uyarı gönderilecek webhook url
                },
                telegram: {
                    status: { type: Boolean, default: false }, // Telegram ile uyarı gönderilsin mi?
                    token: { type: String, default: '' }, // Telegram bot token
                    chatId: { type: String, default: '' }, // Telegram chat id
                },
                lastSent: { type: String, default: moment().format('YYYY-MM-DD HH:mm:ss') }, // Son gönderim tarihi
            },
            newPayment: {
                status: { type: Boolean, default: false }, // Yeni ödeme talebi uyarısı açık mı?
                sms: {
                    status: { type: Boolean, default: false }, // SMS ile uyarı gönderilsin mi?
                    number: { type: String, default: '' }, // SMS ile uyarı gönderilecek numara
                },
                mail: {
                    status: { type: Boolean, default: false }, // Mail ile uyarı gönderilsin mi?
                    mail: { type: String, default: '' }, // Mail ile uyarı gönderilecek mail adresi
                },
                discordWebhook: {
                    status: { type: Boolean, default: false }, // Discord ile uyarı gönderilsin mi?
                    url: { type: String, default: '' }, // Discord ile uyarı gönderilecek webhook url
                },
                telegram: {
                    status: { type: Boolean, default: false }, // Telegram ile uyarı gönderilsin mi?
                    token: { type: String, default: '' }, // Telegram bot token
                    chatId: { type: String, default: '' }, // Telegram chat id
                },
                lastSent: { type: String, default: moment().format('YYYY-MM-DD HH:mm:ss') }, // Son gönderim tarihi
            },
            balanceLoaded: {
                status: { type: Boolean, default: false }, // Bakiye yüklenince uyarı açık mı?
                sms: {
                    status: { type: Boolean, default: false }, // SMS ile uyarı gönderilsin mi?
                    number: { type: String, default: '' }, // SMS ile uyarı gönderilecek numara
                },
                mail: {
                    status: { type: Boolean, default: false }, // Mail ile uyarı gönderilsin mi?
                    mail: { type: String, default: '' }, // Mail ile uyarı gönderilecek mail adresi
                },
                discordWebhook: {
                    status: { type: Boolean, default: false }, // Discord ile uyarı gönderilsin mi?
                    url: { type: String, default: '' }, // Discord ile uyarı gönderilecek webhook url
                },
                telegram: {
                    status: { type: Boolean, default: false }, // Telegram ile uyarı gönderilsin mi?
                    token: { type: String, default: '' }, // Telegram bot token
                    chatId: { type: String, default: '' }, // Telegram chat id
                },
                lastSent: { type: String, default: moment().format('YYYY-MM-DD HH:mm:ss') }, // Son gönderim tarihi
            },
            failedOrder: {
                status: { type: Boolean, default: false }, // Bakiye yüklenince uyarı açık mı?
                sms: {
                    status: { type: Boolean, default: false }, // SMS ile uyarı gönderilsin mi?
                    number: { type: String, default: '' }, // SMS ile uyarı gönderilecek numara
                },
                mail: {
                    status: { type: Boolean, default: false }, // Mail ile uyarı gönderilsin mi?
                    mail: { type: String, default: '' }, // Mail ile uyarı gönderilecek mail adresi
                },
                discordWebhook: {
                    status: { type: Boolean, default: false }, // Discord ile uyarı gönderilsin mi?
                    url: { type: String, default: '' }, // Discord ile uyarı gönderilecek webhook url
                },
                telegram: {
                    status: { type: Boolean, default: false }, // Telegram ile uyarı gönderilsin mi?
                    token: { type: String, default: '' }, // Telegram bot token
                    chatId: { type: String, default: '' }, // Telegram chat id
                },
                lastSent: { type: String, default: moment().format('YYYY-MM-DD HH:mm:ss') }, // Son gönderim tarihi
            },
        },
        integrations: { // Entegrasyonlar
            seo: {
                name: { type: String, default: 'SpeedSMM' },
                url: { type: String, default: config.siteUrl },
                description: { type: String, default: 'SpeedSMM' },
                keywords: { type: String, default: 'SpeedSMM, smm, smmpanel, panel' },
            },
            googleAnalytics: {
                status: { type: Boolean, default: false }, // Google Analytics açık mı?
                code: { type: String, default: '' }, // Google Analytics takip numarası
                trackingId: { type: String, default: '' }, // Google Analytics takip numarası
            },
            googleTagManager: {
                status: { type: Boolean, default: false }, // Google Tag Manager açık mı?
                code: { type: String, default: '' }, // Google Tag Manager takip numarası
            },
            captcha: {
                service: { type: Boolean, default: false }, //  (true = google, false = hcaptcha)
                siteKey: { type: String, default: '' }, // Site anahtarı
                secretKey: { type: String, default: '' }, // Gizli anahtar
                status: { type: Boolean, default: false }, // Captcha durumu
            },
            beamer: {
                status: { type: Boolean, default: false }, // Beamer açık mı?
                code: { type: String, default: '' }, // Beamer kodu
            },
            getSiteControl: {
                status: { type: Boolean, default: false }, // GetSiteControl açık mı?
                code: { type: String, default: '' }, // GetSiteControl kodu
            },
            jivoChat: {
                status: { type: Boolean, default: false }, // JivoChat açık mı?
                code: { type: String, default: '' }, // JivoChat kodu
            },
            tawkTo: {
                status: { type: Boolean, default: false }, // TawkTo açık mı?
                code: { type: String, default: '' }, // TawkTo kodu
            },
            oneSignal: {
                status: { type: Boolean, default: false }, // OneSignal açık mı?
                code: { type: String, default: '' }, // OneSignal kodu
            },
            pushAlert: {
                status: { type: Boolean, default: false }, // PushAlert açık mı?
                code: { type: String, default: '' }, // PushAlert kodu
            },
            smartUpp: {
                status: { type: Boolean, default: false }, // SmartUpp açık mı?
                code: { type: String, default: '' }, // SmartUpp kodu
            },
            tidio: {
                status: { type: Boolean, default: false }, // Tidio açık mı?
                code: { type: String, default: '' }, // Tidio kodu
            },
            zendesk: {
                status: { type: Boolean, default: false }, // Zendesk açık mı?
                code: { type: String, default: '' }, // Zendesk kodu
            },
            getButton: {
                status: { type: Boolean, default: false }, // GetButton açık mı?
                code: { type: String, default: '' }, // GetButton kodu
            }
        },
    },
    virtualPos: {
        payTr: {
            status: { type: Boolean, default: false }, // PayTR açık mı?
            pos: { type: String, default: 'paytr' }, // Pos türü (paytr, paytrhavale)
            name: { type: String, default: 'PayTR' }, // Görünür isim
            commission: { type: Number, default: 2 }, // Komisyon oranı
            minPrice: { type: Number, default: 10 }, // Minimum ödeme tutarı
            maxPrice: { type: Number, default: 1000 }, // Maksimum ödeme tutarı
            merchantId: { type: String, default: '' }, // PayTR mağaza numarası
            merchantKey: { type: String, default: '' }, // PayTR mağaza anahtarı
            merchantSalt: { type: String, default: '' }, // PayTR mağaza tuzlama anahtarı
        },
        payTrHavale: {
            status: { type: Boolean, default: false }, // PayTR Havale açık mı?
            pos: { type: String, default: 'paytrhavale' }, // Pos türü (paytr, paytrhavale)
            name: { type: String, default: 'PayTR Havale' }, // Görünür isim
            commission: { type: Number, default: 0 }, // Komisyon oranı
            minPrice: { type: Number, default: 10 }, // Minimum ödeme tutarı
            maxPrice: { type: Number, default: 1000 }, // Maksimum ödeme tutarı
            merchantId: { type: String, default: '' }, // PayTR mağaza numarası
            merchantKey: { type: String, default: '' }, // PayTR mağaza anahtarı
            merchantSalt: { type: String, default: '' }, // PayTR mağaza tuzlama anahtarı
        },
        vallet: {
            status: { type: Boolean, default: false }, // Vallet açık mı?
            pos: { type: String, default: 'vallet' }, // Pos türü (vallet)
            name: { type: String, default: 'Vallet' }, // Görünür isim
            commission: { type: Number, default: 0 }, // Komisyon oranı
            minPrice: { type: Number, default: 10 }, // Minimum ödeme tutarı
            maxPrice: { type: Number, default: 1000 }, // Maksimum ödeme tutarı
            api_user: { type: String, default: '' }, // Vallet api kullanıcı adı
            shop_code: { type: String, default: '' }, // Vallet mağaza kodu
            api_key: { type: String, default: '' }, // Vallet api anahtarı
            api_hash: { type: String, default: '' }, // Vallet api hash
        },
        weepay: {
            status: { type: Boolean, default: false }, // Weepay Açık mı ? 
            pos: { type: String, default: 'weepay' }, // Pos türü (weepay)
            name: { type: String, default: 'Weepay' }, // Görünür isim
            commission: { type: Number, default: 0 }, // Komisyon oranı
            minPrice: { type: Number, default: 10 }, // Minimum ödeme tutarı
            maxPrice: { type: Number, default: 1000 }, // Maksimum ödeme tutarı
            bayiId: { type: String, default: '' }, // Weepay bayi id
            apiKey: { type: String, default: '' }, // Weepay api anahtarı
            secretKey: { type: String, default: '' }, // Weepay gizli anahtar
            currency: { type: String, default: 'TRY' }, // Weepay para birimi
        },
        shipy: {
            status: { type: Boolean, default: false }, // Shipy Açık mı ?
            pos: { type: String, default: 'shipy' }, // Pos türü (shipy)
            name: { type: String, default: 'Shipy' }, // Görünür isim
            commission: { type: Number, default: 0 }, // Komisyon oranı
            minPrice: { type: Number, default: 10 }, // Minimum ödeme tutarı
            maxPrice: { type: Number, default: 1000 }, // Maksimum ödeme tutarı
            apiKey: { type: String, default: '' }, // Shipy api anahtarı
        },
        iyzico: {
            status: { type: Boolean, default: false }, // Iyzico Açık mı ?
            pos: { type: String, default: 'iyzico' }, // Pos türü (iyzico)
            name: { type: String, default: 'Iyzico' }, // Görünür isim
            commission: { type: Number, default: 0 }, // Komisyon oranı
            minPrice: { type: Number, default: 10 }, // Minimum ödeme tutarı
            maxPrice: { type: Number, default: 1000 }, // Maksimum ödeme tutarı
            apiKey: { type: String, default: '' }, // Iyzico api anahtarı
            apiSecret: { type: String, default: '' }, // Iyzico api gizli anahtarı
        },
    },
    banksAccounts: { type: Array, default: [] }, // Banka hesapları (bankName, accountName, accountNumber, iban, branchCode)
    apiServices: { type: Array, default: [] }, // Api servisleri (name, url, apiKey)
    license: {
        key: { type: String, default: config.licenseKey }, // Lisans anahtarı
        status: { type: String, default: 'active' }, // (active, expired, cancelled)
        expireDate: { type: String, default: moment().format('DD MMMM YYYY HH:mm:ss') }, // Lisansın son kullanma tarihi
        lastCheck: { type: String, default: moment().format('DD MMMM YYYY HH:mm:ss') }, // Son kontrol tarihi
    },
});

module.exports = mongoDB.model('site', site);