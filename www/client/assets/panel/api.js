
document.getElementById("service_type").addEventListener("change", function () {
    var type = document.getElementById("service_type").value;
    let x = [
        0,
        10,
        2,
        14,
        17,
        20,
        100
    ];
    for (let i = 0; i <= x.length; i++) {
        if(type == x[i]) {
            document.getElementById(`type_${x[i]}`).style.display = "block";
        } else {
            document.getElementById(`type_${x[i]}`).style.display = "none";
        }
    }
});

document.getElementById("domain_and_protocol").innerHTML = window.location.protocol + "//" + window.location.hostname;