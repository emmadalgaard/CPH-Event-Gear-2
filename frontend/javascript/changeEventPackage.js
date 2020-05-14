let eventPackageArray = null;

async function changeEventPackage() {
    eventPackageArray = await (
        await fetch("http://localhost:3000/eventpackage", {
            method: "GET",
        })
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
    var e = document.getElementById("selectNumber"); // bruges til at "få fat" i dropdown-boksen
    var value = e.options[e.selectedIndex].value; // der "tages vi fat" i det felt på dropdownboksen, som er givet ved selectedindex
    // og value er den faktuelle værdi, som står på dette felt.
    eventPackageArray.forEach((package) => {
        if  (package.name == value) { // Derefter har vi en foreach løkke over eventpackagearrayet som finder den eventpackage, som svarer til den
            // valgte pakke. Når eventpakken kendes, så bliver den tilhørende pris slået op i det indtastningsfelt, vi har oprettet på html siden.
            document.getElementById("eventPrice").value = package.price
        }
    })
}
/* i denne funktion bruger vi GET-metoden til at hen data ned og derefter bruges PUT-metoden til at opdatere prisen via en URL adresse,
 samt et current_id for at finde den pakke, som skal opdateres. */
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
    eventPackageArray.forEach((package) => { //de relevante data or
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
    else if (parseInt(newPrice) > 0) { //parseInt er metode, som konverterer værdien til et tal.
        if(newPrice == currentPrice ){
         alert("Prisen er lig den allerede gemte")
        }
        else{
                let c = new Eventpackage(currentName, newPrice, currentPackageType); /* ved hjælp Eventpackage klassen,
             oprettes et nyt instans af objektet, hvor newPrice er den indtastede pris*/
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