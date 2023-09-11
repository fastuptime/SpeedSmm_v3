function pageRedirect(window, redirect) {
    window.location.href = window.location.href + redirect;
}

async function registerSpeedSmmPanel(token) {
    if(!token) return pageRedirect(window, "?success=false&message=Token Bulunamadı");
    let password = document.getElementById("password")?.value || null;
    let username = document.getElementById("username")?.value;
    let name = document.getElementById("name")?.value;
    let surname = document.getElementById("surname")?.value;
    let email = document.getElementById("email")?.value;
    let phone = document.getElementById("phone")?.value || null;
    let registerbtn = document.getElementById("register");
    if(!password || !username || !name || !surname || !email) return pageRedirect(window, "?success=false&message=Boş Alan Bırakmayınız");
    if(password.length < 6) return pageRedirect(window, "?success=false&message=Şifre En Az 6 Karakter Olmalıdır");
    if(password !== document.getElementById("passwordConfirm")?.value) return pageRedirect(window, "?success=false&message=Şifreler Eşleşmiyor");
    registerbtn.innerHTML = "Lütfen Bekleyiniz...";
    registerbtn.disabled = true;
    let data = {
        token: token,
        username,
        name,
        surname,
        email,
        phone,
        password,
        terms: document.getElementById("authCheck")?.checked || false
    }

    let response = await fetch("/api/v1/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    }).then(res => res.json());
    
    if(response.status === "200") return pageRedirect(window, `?success=true&message=${response.message}`);
    else return pageRedirect(window, `?success=false&message=${response.message}`);
}


async function loginSpeedSmmPanel(token) {
    if (!token) return pageRedirect(window, "?success=false&message=Token Bulunamadı");
    let password = document.getElementById("password")?.value || null;
    let username = document.getElementById("username")?.value;
    let loginBtn = document.getElementById("login");
    if (!password || !username) return pageRedirect(window, "?success=false&message=Boş Alan Bırakmayınız");
    if (password.length < 6) return pageRedirect(window, "?success=false&message=Şifre En Az 6 Karakter Olmalıdır");
    loginBtn.innerHTML = "Lütfen Bekleyiniz...";
    loginBtn.disabled = true;
    let data = {
        token: token,
        username,
        password
    }

    let response = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    }).then(res => res.json());

    if (response.status === "200") return pageRedirect(window, `?success=true&message=${response.message}`);
    else return pageRedirect(window, `?success=false&message=${response.message}`);
}