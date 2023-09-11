document.getElementById("newOrderQuantityDiv").style.display = "none";

$(document).ready(function () {
    $('.js-example-basic-single').select2();
    $('.js-example-basic-single2').select2();
});

$(".js-example-basic-single3").on("select2:select", function (e) {
    let category = this.value;
    let service = document.getElementById("newOrderCategory");
    service.innerHTML = "";
    service.innerHTML = `<option value="0">Kategori Seçiniz</option>`;
    if (category == 0) return;
    fetch("/api/v1/platforms/get/" + category).then(res => res.json()).then(res => {
        if (res.status === "200") {
            service.innerHTML = "";
            res.data.forEach(element => {
                service.innerHTML += `<option value="${element.id}">${element.name}</option>`;
            });
            service.disabled = false;
        }
    });
});

$(".js-example-basic-single").on("select2:select", function (e) {
    let category = this.value;
    let service = document.getElementById("newOrderService");
    service.innerHTML = "";
    service.innerHTML = `<option value="0">Servis Seçiniz</option>`;
    if (category == 0) return;
    fetch("/api/v1/services/get/" + category).then(res => res.json()).then(res => {
        if (res.status === "200") {
            service.innerHTML = "";
            res.data.forEach(element => {
                service.innerHTML += `<option value="${element.id}">${element.name}</option>`;
            });
            service.disabled = false;
            document.getElementById("newOrderQuantityDiv").style.display = "block";
            document.getElementById("newOrderDescription").innerHTML = res.category;
        }
    });
});

$(".js-example-basic-single2").on("select2:select", function (e) {
    let service = this.value;
    if (service == 0) return;
    fetch("/api/v1/service/get/" + service).then(res => res.json()).then(res => {
        if (res.status === "200") {
            document.getElementById("newOrderMin").innerHTML = res.data[0].min;
            document.getElementById("newOrderMax").innerHTML = res.data[0].max;
            document.getElementById("newOrderPrice").innerHTML = res.data[0].price;
        }
    });
});


$("#wizard").steps({
    headerTag: "h2",
    bodyTag: "section",
    enableFinishButton: false,
    enablePagination: false, 
    enableAllSteps: true,
    titleTemplate: "#title#"
});

$("#wizardVertical").steps({
    headerTag: "h2",
    bodyTag: "section",
    transitionEffect: "slideLeft",
    stepsOrientation: 'vertical'
});

function balanceExchangex() {
    let x = fetch('/api/v1/exchange_rate');
    x = x.then((res) => res.json());
    x.then((res) => {
        if (res.status == "200") {
            document.getElementById('mainPageuserBalance').innerHTML = res.data.user_balance.toFixed(2) + ' '
            document.getElementById('mainPageuserSpent').innerHTML = res.data.spent.toFixed(2) + ' '
        } else {
            document.getElementById('mainPageuserBalance').innerHTML = "0.00";
            document.getElementById('mainPageuserSpent').innerHTML = "0.00";
        }
    });

}

balanceExchangex();