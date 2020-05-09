// tjekker om bruger er logget ind, når denne prøver at tilgå profil-siden
function checkLoginProfilePage() {
    if (JSON.parse(localStorage.getItem("customer")).phone == null) {
        window.location = "Loginpage.html";
    } else {
        window.location = "profile.html";
    }
}

// ved onclick på HTML-knap logges brugeren ud, og customer-objektet slettes i localstorage
function logOut() {
    localStorage.removeItem("customer");
    window.location = "index.html";
}

// henter data fra databasen og sætter det i LocalStorage, så info vises på bruger
async function populateCustomers() {
    const customerArray = await (
        await fetch("http://localhost:3000/customer")
    ).json();
    customerArray.forEach((customer) => {
        // Et if statement bruges til at tjekke, at det er en current user ved at sammenligne databasens phone med local storage, fordi phone er unikt for hver bruger
        if (customer.phone == JSON.parse(localStorage.getItem("customer")).phone) {
            document.getElementById("customerName").innerHTML = customer.customerName;
            document.getElementById("customerAddress").innerHTML = customer.address;
            document.getElementById("customerCity").innerHTML = customer.city;
            document.getElementById("customerPhone").innerHTML = customer.phone;
            document.getElementById("customerEmail").innerHTML = customer.email;
        }
    })
}
// Kalder funktionen for at få info frem
populateCustomers();

// Laver en funktion, der henter data fra databasen for order og viser det på brugerprofilen
async function populateOrders() {
    const orderArray = await (
        await fetch("http://localhost:3000/order")
    ).json();

    // Nedenstående kan bruges i stedet for en async-function
    // fetch("http://localhost:3000/order").then(status => do something).then(data => this is our data.)

        // nedenfor løbes orderArray igennem, hvor der laves en ny instans af klassen Order, og metoden fra Order-klasse bruges
        for (let i = 0; i < orderArray.length; i++) {
            let order = new Order();
            order.applyData(orderArray[i]);  // applyData er en metode til at påføre data i json-format til vores frontend

            // en ny variabel bliver lavet og sat lig createElement() metoden, for at lave et nyt <p> tag i vores HTML
            var orderInfo = document.createElement("P");

            // innerHTML af det nyoprettede <p> tag sættes lig template string, der gør brug af template literals med værdien af variablerne fra orders fra brugeren
            // dette sker kun for de ordrer hvor telefonnummeret på ordren er lig brugerens telefonnummer, så denne ikke kan se andre brugeres bestillinger
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
            if (order.phone == JSON.parse(localStorage.getItem("customer")).phone) {
                orderInfo.innerHTML =
                    `Dato for udlejning:
                    ${order.orderDay} / ${order.orderMonth} / ${order.orderYear}
                    <br> <br> 
                    ${order.amount1 ? "Rund Fødselsdag: " + order.amount1 + "<br>" : ""} 
                    ${order.amount2 ? "Bryllup: " + order.amount2 + "<br>" : ""}
                    ${order.amount3 ? "Studentergilde: " + order.amount3 + "<br>" : ""}
                    <br>
                    Samlet pris til betaling ved udlejning: ${order.orderPrice}<br><br>
                    Ordre ID: ${order._id}
                    <hr>`
                // :? er et if statement (kaldet ternary operator), hvor amount 1,2,3 checkes for, om de er tomme - hvis tomme indgår de ikke i ordren

                // appendChild metoden bruges til at sætte det nyoprettede <p> tag som et child til ID'et "orderList"
                document.getElementById("orderList").appendChild(orderInfo);

                // tømmer noOrders i innerHTML. noOrders viser at der er ingen ordrer. Når denne funktion køres (altså når der er lavet ordrer på brugeren) fjernes den tekst
                document.getElementById("noOrders").innerHTML = "";
            
        }
    }
}

// Kalder funktionen for at vise ordreinfo
populateOrders();



/*Nedenstående funktion sletter en bruger fra databasen ved at gå alle objekter igennem i customer arrayet'et i databasen
og derefter finder telefonnummeret fra databasen som passer til det, der er i local storage, så den finder current user.
deleteUser() kører, når der klikkes på knappen "slet bruger", som er sat op i profile.html
hvis der trykkes ja til sletning af brugeren, vil metoden DELETE kører og fetche endpointet /delete/customer/Id */
async function deleteUser() {
    const customerArray = await (
        await fetch("http://localhost:3000/customer")
    ).json();
    customerArray.forEach((customer) => {
        if (customer.phone == JSON.parse(localStorage.getItem('customer')).phone) {
            customerId = customer._id
        }

    });
    var choice = window.confirm(
        "Er du sikker på, at du vil slette din bruger?");
    if (choice == true) {
        // Lavet med inspiration fra https://stackoverflow.com/questions/40284338/javascript-fetch-delete-and-put-requests
        fetch("http://localhost:3000/customer/delete/" + customerId, {
            method: "DELETE",
        })
            .then(res => res.text()).then(res => console.log(res));

        alert("Bruger er blevet slettet");
        window.location = "index.html";
        deleteOrder();
        logOut();
    }
}

//Funktionen kaldes så ordrer kan ses i dropdown menuen
window.onload= selectOrders();

async function selectOrders() {
    const orderArray = await (
        await fetch("http://localhost:3000/order")
    ).json();

    var select = document.getElementById("orderSelect");

    // se kommentarer i Users_customer_admin.js i funktion choosePhoneNumber()
    orderArray.forEach((order) => {
        if (order.phone == JSON.parse(localStorage.getItem("customer")).phone) {
            var option = order._id;
            var el = document.createElement("option");

            el.textContent = option;
            el.value = option;
            select.appendChild(el);
        }
    })
}

// bygget på samme måde som deleteUser, men med et for-loop og if-statement, der tjekker om det valgte ordre-id er lig det ordre-id der skal slettes
async function deleteOrder() {
    const orderArray = await (
        await fetch("http://localhost:3000/order")
    ).json();

    var select = document.getElementById("orderSelect");

    for (let i = 0; i < orderArray.length; i++) {
        if (select.value == orderArray[i]._id) {
            var choice = window.confirm("Er du sikker på, at du vil slette din ordre?");
            if (choice == true) {
                //Lavet med inspiration fra https://stackoverflow.com/questions/40284338/javascript-fetch-delete-and-put-requests
                fetch("http://localhost:3000/order/delete/" + orderArray[i]._id, {
                    method: "DELETE",
                })
                    .then(res => res.text()).then(res => console.log(res));

                alert("Din ordre er blevet slettet");
                window.location = "profile.html";
            }
        }
    }
}

