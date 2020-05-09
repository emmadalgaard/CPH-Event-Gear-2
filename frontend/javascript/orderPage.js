// tjekker om bruger er logget ind, når denne prøver at tilgå profil-siden
function checkLoginProfilePage() {
    if (JSON.parse(localStorage.getItem('customer')).phone == null) {
        window.location = "Loginpage.html"
    } else {
        window.location ="profile.html"
    }
}

/* Følgende funktion aktiveres ved vælg tidspunkt-knappen. Den har følgende formål:
    1. Tjekker om dato er udfyldt, ellers viser den fejl
    2. Tjekker om der er allerede er reservationer for den givne dag, og justerer mængden af festpakker der vises

 */

async function confirmTime() {
    var rentDayID = document.getElementById("rentDay");
    var rentDayValue = rentDayID.options[rentDayID.selectedIndex].value;
    var rentMonthID = document.getElementById("rentMonth");
    var rentMonthValue = rentMonthID.options[rentMonthID.selectedIndex].value;
    var rentYearID = document.getElementById("rentYear");
    var rentYearValue = rentYearID.options[rentYearID.selectedIndex].value;


    // Tjekker om variabler er lig 0, altså ikke er blevet sat
    // Hvis de er sat, ændrer den display property fra "none" til "", og viser event pakkerne og deres mængder
    if (rentDayValue != "00" && rentMonthValue != "00" && rentYearValue != "00") {
        document.getElementById("modelContainer1").style.display = '';
        document.getElementById("modelContainer2").style.display = '';
        document.getElementById("modelContainer3").style.display = '';
        document.getElementById('eventpackage1Amount3').style.display = '';
        document.getElementById('eventpackage1Amount2').style.display = '';
        document.getElementById('eventpackage2Amount3').style.display = '';
        document.getElementById('eventpackage2Amount2').style.display = '';
        document.getElementById('eventpackage3Amount3').style.display = '';
        document.getElementById('eventpackage3Amount2').style.display = '';
    } else { // Hvis ikke udfyldt viser den en alert med følgende
        alert("Udfyld venligst alle felter.");
    }

    const orderArray = await (
        await fetch("http://localhost:3000/order")
    ).json();

    // orderAmount sættes lig længden af arrayet orderArray
    var orderAmount = orderArray.length;

    // refererer til eventpakkerne, der som udgangspunkt er sat til 0 fordi de som standard ikke er booket.
    var occupiedAmount1 = 0;
    var occupiedAmount2 = 0;
    var occupiedAmount3 = 0;

    /* et for-loop laves for at gennemgå alle registrerede ordre og tælle mængde af optagede eventpakker for den valgte dato
    Formålet for loopet er kun at vise de ledige eventpakker. */
    for (var i = 0; i < orderAmount; i++) {
        if (rentDayValue == orderArray[i].orderDay && rentMonthValue == orderArray[i].orderMonth && rentYearValue == orderArray[i].orderYear) {
            // Tæller mængden af reserverede rund-fødselsdags pakker og tilføjer dem til variablen
            if (orderArray[i].amount1 == 1) {
                occupiedAmount1++;
            } else if (orderArray[i].amount1 == 2) {
                occupiedAmount1+=2;
            } else if (orderArray[i].amount1 == 3) {
                occupiedAmount1+=3;
            }
            // Tæller mængden af reserverede bryllups pakker og tilføjer dem til variablen
            if (orderArray[i].amount2 == 1) {

                occupiedAmount2++;
            } else if (orderArray[i].amount2 == 2) {
                occupiedAmount2+=2;
            } else if (orderArray[i].amount2 == 3) {
                occupiedAmount2+=3;
            }
            // Tæller mængden af reserverede studentergilde pakker og tilføjer dem til variablen
            if (orderArray[i].amount3 == 1) {
                occupiedAmount3++;
            } else if (orderArray[i].amount3 == 2) {
                occupiedAmount3+=2;
            } else if (orderArray[i].amount3 == 3) {
                occupiedAmount3+=3;
            }
        }
    }

    // Nedenstående if-statements korrigerer mængden for de respektive eventpakker, hvis nogle er reserveret
    if (occupiedAmount1 == 1) {
        document.getElementById('eventpackage1Amount3').style.display = "none";
    } else if (occupiedAmount1 == 2) {
        document.getElementById('eventpackage1Amount3').style.display = "none";
        document.getElementById('eventpackage1Amount2').style.display = "none";
        // Nedenstående condition er sat til >= hvis der kommer en bug og mængden af reserverede pakker overstiger 3
    } else if (occupiedAmount1 >= 3) {
        document.getElementById("modelContainer1").style.display = "none";
    }

    if (occupiedAmount2 == 1) {
        document.getElementById('eventpackage2Amount3').style.display = "none";
    } else if (occupiedAmount2== 2) {
        document.getElementById('eventpackage2Amount3').style.display = "none";
        document.getElementById('eventpackage2Amount2').style.display = "none";
    } else if (occupiedAmount2 >= 3) {
        document.getElementById("modelContainer2").style.display = "none";
    }

    if (occupiedAmount3 == 1) {
        document.getElementById('eventpackage3Amount3').style.display = "none";
    } else if (occupiedAmount3 == 2) {
        document.getElementById('eventpackage3Amount3').style.display = "none";
        document.getElementById('eventpackage3Amount2').style.display = "none";
    } else if (occupiedAmount3 >= 3) {
        document.getElementById("modelContainer3").style.display = "none";
    }
}

/* Laver en funktion, der viser eventpakkerne ved at gette fra endpointet /eventpackage.
Bruger packageType til at skelne mellem de forskellige pakker og henter navn og pris fra databasen */
async function showEventpackages() {
    const eventpackageArray = await (
        await fetch("http://localhost:3000/eventpackage")
    ).json();

    eventpackageArray.forEach((eventpackage) => {
        if(eventpackage.packageType == "pakke1") {
            document.getElementById("eventpackageHeadline1").innerHTML = eventpackage.name;
            document.getElementById("pris1").innerHTML = "Pris: " + eventpackage.price + " kr.";
        } else if(eventpackage.packageType == "pakke2") {
            document.getElementById("eventpackageHeadline2").innerHTML = eventpackage.name;
            document.getElementById("pris2").innerHTML = "Pris: " + eventpackage.price + " kr.";
        } else if(eventpackage.packageType == "pakke3") {
            document.getElementById("eventpackageHeadline3").innerHTML = eventpackage.name;
            document.getElementById("pris3").innerHTML = "Pris: " + eventpackage.price + " kr.";
        }

    })
}
// Kalder funktionen for at få info frem
showEventpackages();

// Definerer eventpakkerne 1, 2,3 globalt for at alle funktionerne kan tilgå dem - vi opretter dem som tomme variable, så vi kan lave instanser af klassen
let eventpackage1 = null;
let eventpackage2 = null;
let eventpackage3 = null;

/* Denne funktion aktiveres, når der vælges amount af en pakke
Laver en funktion, der først gør det samme som ovenfor ved showEventpackages for at hente dem fra databasen */
async function calculatePrice() {
    const eventpackageArray = await (
        await fetch("http://localhost:3000/eventpackage")
    ).json();

        eventpackageArray.forEach((eventpackage) => {
            if(eventpackage.packageType == "pakke1") {
                eventpackage1 = new Eventpackage(eventpackage.name, eventpackage.price, "pakke1");
            } else if(eventpackage.packageType == "pakke2") {
                eventpackage2 = new Eventpackage(eventpackage.name, eventpackage.price, "pakke2");
            } else if(eventpackage.packageType == "pakke3") {
                eventpackage3 = new Eventpackage(eventpackage.name, eventpackage.price, "pakke3");
            }
        });

    // Gemmer værdien af order amounts i nogle variable
    let orderAmount1JS = document.getElementById('orderAmount1').value;
    let orderAmount2JS = document.getElementById('orderAmount2').value;
    let orderAmount3JS = document.getElementById('orderAmount3').value;

    // Udregner den samlede pris for pakkerne
    let finalPrice = orderAmount1JS * eventpackage1.price + orderAmount2JS * eventpackage2.price + orderAmount3JS * eventpackage3.price;
    document.getElementById('totalPrice').innerHTML = "Samlet Pris: " + finalPrice + " kr.";
    document.getElementById('basketDivFull').style.display = "";

    //Tjekker at hvis alle pakkeamounts er lig 0, viser den ikke kurv-vinduet
    if (orderAmount1JS == 0 && orderAmount2JS == 0 && orderAmount3JS == 0)
        document.getElementById('basketDivFull').style.display = "none";

    // Nedenstående tjekker om order amount er over 0, hvis ja, tilføjer den billede, navn og pris - hvis ikke, popper kurv-vinduet ikke op
   if (orderAmount1JS > 0) {
        document.getElementById('basketEventpackage1').innerHTML = "<img style=\"width:30%; float:left; \" src=\"../images/50år.png\">" + eventpackage1.name + "<br> Antal: " + orderAmount1JS + "<br> Pris: " + orderAmount1JS * eventpackage1.price + " kr.";
    } else {
        document.getElementById('basketEventpackage1').innerHTML = "";
    }
    if (orderAmount2JS > 0) {
        document.getElementById('basketEventpackage2').innerHTML = "<br> <img style=\"width:30%; float:left; \" src=\"../images/Bryllup.png\">" + eventpackage2.name + "<br> Antal: " + orderAmount2JS + "<br> Pris: " + orderAmount2JS * eventpackage2.price + " kr.";
    } else {
        document.getElementById('basketEventpackage2').innerHTML = "";
    }
    if (orderAmount3JS > 0) {
        document.getElementById('basketEventpackage3').innerHTML = "<br> <img style=\"width:30%; float:left; \" src=\"../images/Studentergilde.png\">" + eventpackage3.name + "<br> Antal: " + orderAmount3JS + "<br> Pris: " + orderAmount3JS * eventpackage3.price + " kr.";
    } else {
        document.getElementById('basketEventpackage3').innerHTML = "";
    }
}

// Denne funktions formål er at gemme den oprettede order i databasen
async function storeOrder() {
    if (JSON.parse(localStorage.getItem('customer')) == null) { // man kan ikke lave en ordre hvis man ikke er logget ind
        alert("Du er ikke logget ind");
        window.location = "Loginpage.html"
    } else {
        var orderAmount1JS = document.getElementById('orderAmount1').value;
        var orderAmount2JS = document.getElementById('orderAmount2').value;
        var orderAmount3JS = document.getElementById('orderAmount3').value;

        var orderDay = document.getElementById('rentDay').value;
        var orderMonth = document.getElementById('rentMonth').value;
        var orderYear = document.getElementById('rentYear').value;

        let phone = JSON.parse(localStorage.getItem("customer")).phone;

        // lavet til at beregne prisen for den samlede ordre
        var finalPrice = orderAmount1JS * eventpackage1.price + orderAmount2JS * eventpackage2.price + orderAmount3JS * eventpackage3.price;

        // se kommentarer i Users_customer_admin.js i funktionen register
        let o = new Order(phone, orderAmount1JS, orderAmount2JS, orderAmount3JS, orderDay, orderMonth, orderYear, finalPrice);
        console.log(o)
        await fetch("http://localhost:3000/order", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(o)
        })

        alert("Din ordre er modtaget");
        window.location = "profile.html";
    }

}



