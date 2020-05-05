window.onload = changeEventPackage();

async function changeEventPackage() {
    // JSON.parse(localStorage.getItem("customer")
    //window.location = "EditCustomerProfile.html";
    const eventPackageArray = await (
        await fetch("http://localhost:3000/eventpackage")
    ).json();


    /*var select = document.getElementById("selectNumber");
    var options = ["1", "2", "3", "4", "5"];
    for(var i = 0; i < options.length; i++) {
        var opt = options[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
    }*/
    var select = document.getElementById("selectNumber");
    eventPackageArray.forEach((package) => {
        var option = package.name;
        var el = document.createElement("option");
        el.textContent = option;
        el.value = option;
        select.appendChild(el);

    })


/*
    eventPackageArray.forEach((package) => {
        // En if statement bruges til at tjekke, at det er en current user ved at sammenligne databasens phone med local storage, fordi phone er unikt for ver bruger.
        if (package.phone == JSON.parse(localStorage.getItem("customer")).phone) {

            document.getElementById("customerName").value = customer.customerName;
            document.getElementById("address").value = customer.address;
            document.getElementById("city").value = customer.city;
            document.getElementById("phone").value = customer.phone;
            document.getElementById("email").value = customer.email;
            document.getElementById("password").value = customer.password;
            document.getElementById("confirmPassword").value = customer.password;


        }
    })
*/

}
