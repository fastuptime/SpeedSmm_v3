
document.getElementById('themeChange').addEventListener('click', function () {
    var theme = document.cookie.split('; ').find(row => row.startsWith('theme'))?.split('=')[1] || 'dark';
    if (theme == 'dark') {
        document.cookie = "theme=light; path=/";
    } else {
        document.cookie = "theme=dark; path=/";
    }
    window.location.reload();
});

let pageClearLang = window.location.href.split('?lang=')[0];
if (pageClearLang != window.location.href) {
    window.location.href = pageClearLang.split('?lang=')[0];
    setTimeout(() => {
        window.location.reload();
    }, 1000);
}

let pageClearCurrency = window.location.href.split('?usercurrency=')[0];
if (pageClearCurrency != window.location.href) {
    window.location.href = pageClearCurrency.split('?usercurrency=')[0];
    setTimeout(() => {
        window.location.reload();
    }, 1000);
}

function balanceExchange() {
   let x = fetch('/api/v1/exchange_rate');
   x = x.then((res) => res.json());
    x.then((res) => {
        if(res.status == "200") {
            document.getElementById('userBalance').innerHTML = res.data.user_balance.toFixed(2);
        } else {
            document.getElementById('userBalance').innerHTML = "0.00";
        }
    });

}

balanceExchange();