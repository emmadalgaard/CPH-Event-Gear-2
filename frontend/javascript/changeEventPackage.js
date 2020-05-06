window.onload = changeEventPackage();

let eventPackageArray = null

async function changeEventPackage() {
    // JSON.parse(localStorage.getItem("customer")
    //window.location = "EditCustomerProfile.html";
    eventPackageArray = await (
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

async function showEventPrice() {
    eventPackageArray = await (
        await fetch("http://localhost:3000/eventpackage")
    ).json();
    var e = document.getElementById("selectNumber");
    var value = e.options[e.selectedIndex].value;
   // var text = e.options[e.selectedIndex].text;
    eventPackageArray.forEach((package) => {
        if  (package.name == value) {
            document.getElementById("eventPrice").value = package.price
        }
    })
}

async function updatePrice() {
    eventPackageArray = await (
        await fetch("http://localhost:3000/eventpackage")
    ).json();
   let newPrice = document.getElementById("eventPrice").value
   let currentEventpackage_ID = "";
   let currentName = "";
   let currentPackageType = "";
   var e = document.getElementById("selectNumber");
   var value = e.options[e.selectedIndex].value;
   let currentPrice = 0;
    eventPackageArray.forEach((package) => {
        if  (package.name == value) {
            currentPrice = package.price;
            currentEventpackage_ID = package._id;
            currentName = package.name;
            currentPackageType = package.packageType;
        }
    })


    if (isNaN(newPrice))
    {
        alert("Du skal indtaste et positivt tal ")
    }
    else if (currentName == ""){
        alert("vælg venligt den pakke du ønsker at opdatere prisen på")
    }
    else if (parseInt(newPrice) > 0) {
        if(newPrice == currentPrice ){
         alert("Prisen er lig den allerede gemte")
        }
        else{
                let c = new Eventpackage(currentName, newPrice, currentPackageType);
                await fetch("http://localhost:3000/eventpackage/update/" + currentEventpackage_ID, {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(c)
                });
               // localStorage.setItem("customer", JSON.stringify(c));
                alert("Prisen er nu ændret");
               // window.location = "profile.html";
            }
        }
    else {
        alert ("noget gik galt");
    }
}