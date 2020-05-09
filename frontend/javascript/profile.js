/*The following function uses an if statement with the condition that the phone key in local storage has to equal null.
If the condition is true, it sends the user to the login page, as the user is not logged in. If not, it allows the user to access the order page.
The function is activated by the onclick attribute specified on the "Bestil tid" button HTML tag.
Dette skal laves om til, at man som gæst godt kan se produkterne, man kan bare ikke tilføje dem til en ordre.
 */
window.onload = populateCustomers();

/* function checkLoginOrderPage() {
    if (JSON.parse(localStorage.getItem("customer")).phone == null) {
        window.location = "Loginpage.html";
    } else {
        window.location = "orderPage.html";
    }
} */

/* The following function has the same functionality as the function above, but with the "Profil" button instead.
 */
function checkLoginProfilePage() {
    if (JSON.parse(localStorage.getItem("customer")).phone == null) {
        window.location = "Loginpage.html";
    } else {
        window.location = "profile.html";
    }
}

/* The logOut function removes the specified keys from the local storage. By removing the keys, the user is seen as
logged out by the system.
 */
function logOut() {
    localStorage.removeItem("customer");
    window.location = "index.html";
}

//Laver en funktion, der henter data fra databasen og sætter det i Local Storage, så info vises på bruger
async function populateCustomers() {
    const customerArray = await (
        await fetch("http://localhost:3000/customer")
    ).json();
    customerArray.forEach((customer) => {
        // En if statement bruges til at tjekke, at det er en current user ved at sammenligne databasens phone med local storage, fordi phone er unikt for ver bruger.
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
window.onload = () => {
    populateCustomers();
}

// Laver en funktion, der henter data fra databasen for order og viser det på brugerprofilen
async function populateOrders() {
    const orderArray = await (
        await fetch("http://localhost:3000/order")
    ).json();

    // fetch("iuhergegr").then(status => do something).then(data => this is our data.)

        for (let i = 0; i < orderArray.length; i++) {
            let order = new Order();
            order.applyData(orderArray[i]);

            // eksempel på faktisk at ændre en odre i databasen.
            // order.changeAmount1(2000);
            // fetch("http:localhost:3000/order", {
            //     body: order,
            //     method: "PUT",
            // });

            //new variable is created and set equal to the createElement() method, as we want to create a new <p> tag.

            var orderInfo = document.createElement("P");

            var rundFodselsdag = "Rund fødselsdag:";
            var bryllup = "Bryllup:";
            var studentergilde = "Studentergilde:"

            //The innerHTML of the newly created <p> tag is set equal to a section of text and the variables above.
            //amount 1,2,3 skal checkes for, om de er tomme - hvis tomme, skal de ikke indgå af ordren
            if (order.phone == JSON.parse(localStorage.getItem("customer")).phone) {
                orderInfo.innerHTML =
                    `Dato for udlejning:
                    ${order.orderDay} / ${order.orderMonth} / ${order.orderYear}
                    <br> <br> 
                    ${order.amount1 ? rundFodselsdag + order.amount1 + "<br>" : ""}
                    ${order.amount2 ? bryllup + order.amount2 + "<br>" : ""}
                    ${order.amount3 ? studentergilde + order.amount3 + "<br>" : ""}
                    <br>
                    Samlet pris til betaling ved udlejning: ${order.orderPrice}<br><br>
                    Ordre ID: ${order._id}
                    <hr>`


            //The appendChild method is used to set the newly created <p> tag as a child to to the ID "orderList", specified in the getElementById method.
            document.getElementById("orderList").appendChild(orderInfo);

            /*The following line empties the innerHTML of the noOrders ID tag. If the line below is not run, the text
                explains that there are no orders. Whenever the line below is run, the text is removed.*/
            document.getElementById("noOrders").innerHTML = "";
            
        }
    }
}
// Kalder funktionen for at vise ordreinfo
populateOrders();


/*
Two variables are created. The "selection" variable is set equal to the HTML select tag with the ID "orderID".
The "option" variable is set equal to the options of the "selection" variable.
 */
var selection = document.getElementById("orderId");


/*Nedenstående funktion sletter en bruger fra databasen ved at gå alle objekter igennem i customer arrayet'et i databasen
og derefter finder telefonnummeret fra databasen som passer til det, der er i local storage, så den finder current user
deleteUser() kører, når der klikkes på knappen "slet bruger", som er sat op i profile.html
hvis der trykkes ja til sletning af ordren, vil metoden DELETE kører og fetche endpointet /delete/order/Id */
async function deleteUser() {
    const customerArray = await (
        await fetch("http://localhost:3000/customer")
    ).json();
    customerArray.forEach((customer) => {
        if (customer.phone == JSON.parse(localStorage.getItem('customer')).phone) {
            customerId=customer._id
        }

    });
    var choice = window.confirm(
        "Er du sikker på, at du vil slette din bruger?");
    if (choice == true) {
        //Lavet med inspiration fra https://stackoverflow.com/questions/40284338/javascript-fetch-delete-and-put-requests
        fetch("http://localhost:3000/customer/delete/" + customerId, {
            method: "DELETE",
        })
            .then(res => res.text()) // or res.json()
            .then(res => console.log(res))

        alert("Bruger er blevet slettet");
        window.location = "index.html";
        deleteOrder();
        logOut();
    }
}

//Funktionen kaldes så ordrer kan ses i dropdown menuen.
window.onload= selectOrders();

async function selectOrders() {
    const orderArray = await (
        await fetch("http://localhost:3000/order")
    ).json();

    var select = document.getElementById("orderSelect");

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

async function deleteOrder() {
    const orderArray = await (
        await fetch("http://localhost:3000/order")
    ).json();
    var select = document.getElementById("orderSelect");
    for (let i = 0; i < orderArray.length; i++) {
        if (select.value == orderArray[i]._id) {
            console.log("hello");
            var choice = window.confirm("Er du sikker på, at du vil slette din ordre?");
            if (choice == true) {
                //Lavet med inspiration fra https://stackoverflow.com/questions/40284338/javascript-fetch-delete-and-put-requests
                fetch("http://localhost:3000/order/delete/" + orderArray[i]._id, {
                    method: "DELETE",
                })
                    .then(res => res.text()) // or res.json()
                    .then(res => console.log(res));

                alert("Din ordre er blevet slettet");
                window.location = "profile.html";
            }
        }
    }
}

