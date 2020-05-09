let eventPackageArray = null;

async function changeEventPackage() {
    eventPackageArray = await (
        await fetch("http://localhost:3000/eventpackage")
    ).json();

    // se kommentarer i Users_customer_admin.js i funktion choosePhoneNumber()
    var select = document.getElementById("selectNumber");
    eventPackageArray.forEach((package) => {
        var option = package.name;
        var el = document.createElement("option");
        el.textContent = option;
        el.value = option;
        select.appendChild(el);
    })
}

changeEventPackage();

async function showEventPrice() {
    eventPackageArray = await (
        await fetch("http://localhost:3000/eventpackage")
    ).json();
    var e = document.getElementById("selectNumber");
    var value = e.options[e.selectedIndex].value;
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
                alert("Prisen er nu ændret");
            }
        }
    else {
        alert ("noget gik galt");
    }
}