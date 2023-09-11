
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