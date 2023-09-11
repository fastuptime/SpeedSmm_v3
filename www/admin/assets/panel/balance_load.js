
document.getElementById("method").addEventListener("change", async function () {
    let x = await fetch("/api/v1/payments/" + this.value).then(res => res.json());
    if(x.status != '200') return alert(x.message);
    document.getElementById("min_max").min = x.data.min;
    document.getElementById("min_max").max = x.data.max;
    document.getElementById("min_max").value = x.data.min;
    document.getElementById("commissionx").value = x.data.commission;
    calculatePay(document.getElementById("min_max"));
});

function enforceMinMax(t) {
    if (t.value != "") {
        if (parseInt(t.value) < parseInt(t.min)) {
            t.value = t.min;
        }
        if (parseInt(t.value) > parseInt(t.max)) {
            t.value = t.max;
        }
    }
}

function calculatePay(t) {
    enforceMinMax(t);
    let commissionx = document.getElementById("commissionx").value || 2;
    commissionx = (t.value * commissionx) / 100;
    document.getElementById("commission").value = commissionx;
    document.getElementById("total").value = Number(t.value) + Number(commissionx);
}

document.getElementById("min_max").addEventListener("keyup", function () {
    calculatePay(this);
});

document.getElementById("min_max").addEventListener("change", function () {
    calculatePay(this);
});
