/* MM: The following function uses an if statement with the condition that the phone key in local storage has to equal null.
If the condition is true, it sends the user to the login page, as the user is not logged in. If not, it allows the user to access the order page.
The function is activated by the onclick attribute specified on the "Bestil tid" button HTML tag.
Dette skal laves om til, at man som gæst godt kan se produkterne, man kan bare ikke tilføje dem til en ordre.
 */
function checkLoginOrderPage() {
    if (localStorage.getItem("phone") == null) {
        window.location = "Loginpage.html";
    } else {
        window.location = "orderPage.html";
    }
}
/* MM: The following function has the same functionality as the function above, but with the "Profil" button instead.
 */
function checkLoginProfilePage() {
    if (localStorage.getItem("phone") == null) {
        window.location = "Loginpage.html";
    } else {
        window.location = "profile.html";
    }
}

/* MM: The logOut function removes the specified keys from the local storage. By removing the keys, the user is seen as
logged out by the system.
 */
function logOut() {
    localStorage.removeItem("customerName");
    localStorage.removeItem("address");
    localStorage.removeItem("city");
    localStorage.removeItem("phone");
    localStorage.removeItem("email");
    localStorage.removeItem("password");
}

//Laver en funktion, der henter data fra databasen og sætter det i Local Storage, så info vises på bruger
async function populateCustomers() {
    const customerArray = await (
        await fetch("http://localhost:3000/customer")
    ).json();
    customerArray.forEach((customer) => {
        // En if statement bruges til at tjekke, at det er en current user ved at sammenligne databasens phone med local storage, fordi phone er unikt for ver bruger.
        if (customer.phone == localStorage.getItem("phone")) {

            localStorage.getItem("customerName");
            localStorage.getItem("customerAddress");
            localStorage.getItem("customerCity");
            localStorage.getItem("customerPhone");
            localStorage.getItem("customerEmail");

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

        //The innerHTML of the newly created <p> tag is set equal to a section of text and the variables above.
        //amount 1,2,3 skal checkes for, om de er tomme - hvis tomme, skal de ikke indgå af ordren
        orderInfo.innerHTML =
            "Dato for udlejning: " +
            order.orderDay +
            "/" +
            order.orderMonth +
            "/" +
            order.orderYear +
            "</br></br>" +
            "Antal Sea Doo Spark: " +
            order.amount1 +
            "</br></br>" +
            "Antal Yamaha Waverunner VX: " +
            order.amount2 +
            "</br></br>" +
            "Antal Kawasaki STX-15F: " +
            order.amount3 +
            "</br></br>" +
            "Samlet pris til betaling ved udlejning: " +
            order.orderPrice +
            "</br></br> Ordre ID: " +
            order._id +
            "</br></br>";

         //The appendChild method is used to set the newly created <p> tag as a child to to the ID "orderList", specified in the getElementById method.
        document.getElementById("orderList").appendChild(orderInfo);

        /*The following line empties the innerHTML of the noOrders ID tag. If the line below is not run, the text
            explains that there are no orders. Whenever the line below is run, the text is removed.*/
        document.getElementById("noOrders").innerHTML = "";
    }
}
// Kalder funktionen for at vise ordreinfo
populateOrders();


/*
MM: Two variables are created. The "selection" variable is set equal to the HTML select tag with the ID "orderID".
The "option" variable is set equal to the options of the "selection" variable.
 */
var selection = document.getElementById("orderId");


// MM: The following function deletes the order that is currently selected.
function deleteOrder() {
    var orderArray = JSON.parse(localStorage.getItem("orderArray"));
    /*
    MM: The following for loop cycles through all the stored orders. If the currently selected order is equal to
    the stored order's orderId attribute, the order is removed from the order array.
     */
    for (var i = 0; i < orderArray.length; i++) {
        if (selection.value == orderArray[i].orderId) {
            /*
            MM: The page is reloaded using the location property.
             */
            window.location = "profile.html";
            /*
            MM: The splice method is used to remove a section of the orderArray. It specifies that at position i, it should
            remove 1 item.
             */
            orderArray.splice(i, 1);
            /*
            MM: Using the JSON.stringify method, the orderArray array is saved as a string in the variable "orderArrayString".
            The variable is saved to the key "orderArray" in local storage using the localStorage.setItem method.
             */
            var orderArrayString = JSON.stringify(orderArray);
            localStorage.setItem("orderArray", orderArrayString);
        }
    }
}
/*
MM: The following function prompts the user to confirm that they want to delete their order.
 */
//Function written by Morten Dyberg
function deleteOrderAlert() {
    /*
    MM: The window.confirm method prompts the user to either confirm or cancel the cancellation action.
     */
    var choice = window.confirm("Er du sikker på, at du vil slette din ordre?");
    /*
    MM: If the user confirms to delete their order, an alert appears and the deleteOrder function is called.
     */
    if (choice == true) {
        alert("Ordren er blevet slettet");
        deleteOrder();
    }
}

/*Nedenstående funktion sletter en bruger fra databasen ved at gå alle objekter igennem i customerArray'et i databasen
og derefter finder telefonnummeret fra databasen som passer til det, der er i local storage, så vi finder current user
deleteUser() kører, når der klikkes på knappen "slet bruger", som er sat op i profile.html
hvis der trykkes ja til sletning af bruger, vil metoden DELETE kører og fetche endpointet /delete/customerId */
async function deleteUser() {
    const customerArray = await (
        await fetch("http://localhost:3000/customer")
    ).json();
    customerArray.forEach((customer) => {
        if (customer.phone == localStorage.getItem("phone")) {
            customerId=customer._id
        }

    });
    var choice = window.confirm(
        "Er du sikker på, at du vil slette din bruger?");
    if (choice == true) {
        // Lavet med inspiration fra https://stackoverflow.com/questions/40284338/javascript-fetch-delete-and-put-requests
        fetch("http://localhost:3000/customer/delete/" + customerId, {
            method: "DELETE",
        })
            .then(res => res.text()) // or res.json()
            .then(res => console.log(res));

        alert("Bruger er blevet slettet");
        window.location = "index.html";
        logOut();
        //deleteOrder(); // Den skal ligeledes slette ordren, så snart, vi har implementeret endpoints i frontenden på ordre

    }
}






/*function deleteUser() {
    var userArray = JSON.parse(localStorage.getItem("userArray"));
    var choice = window.confirm(
        "Er du sikker på, at du vil slette din bruger?"
    );
    if (choice == true) {
        /*
        MM: The following for loop runs through all the stored users in the userArray, and if the active phone and the
        phone attribute of the i object in the array is the same, it splices the number i user from the array. The array is then
        again saved to local storage using the JSON.stringify method. The user is linked to the login page using window.location,
        and the logOut() function and deleteOrder() functions are called.
         */
       /* for (var i = 0; i <= userArray.length; i++) {
            if (localStorage.getItem("phone") == userArray[i].phone) {
                alert("Bruger er blevet slettet");
                window.location = "Loginpage.html";
                userArray.splice(i, 1);

                var userArrayString = JSON.stringify(userArray);
                localStorage.setItem("userArray", userArrayString);
                logOut();
                deleteOrder();
            }
        }
    }
}*/