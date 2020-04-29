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

async function populateUsers() {
    // userArray = await ( await fetch ("localhost:3000/customers"))
    // Fordi vi bruger await, venter resten af denne funktion med at eksekvere, indtil customers rent faktisk er henten.
    // Når vi har modtaget svar løbes dette igennem, og laver om til Customer objecter
    // de her customer objecter kan vi så hive specific data ud af, og beslutte os for, hvordan denne skal vises. 
}

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

        /* MM: A new variable is created and set equal to the createElement() method, as we want to create a new <p> tag.
         */
        var orderInfo = document.createElement("P");
        /*
            MM: The innerHTML of the newly created <p> tag is set equal to a section of text and the variables above.
             */
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
        /*
            MM: The appendChild method is used to set the newly created <p> tag as a child to to the ID "orderList", specified in the
            getElementById method.
             */
        document.getElementById("orderList").appendChild(orderInfo);
        /*
            MM: The following line empties the innerHTML of the noOrders ID tag. If the line below is not run, the text
            explains that there are no orders. Whenever the line below is run, the text is removed.
             */
        document.getElementById("noOrders").innerHTML = "";
    }
}

/*  MM: The following function is activated whenever the window has loaded. This is done by using the "window.onload"
event handler.
 */
window.onload = function getCustomerInfo() {
    /*
    MM:
    The code retrieves information from local storage by using the "getItem" command, and specifying the key that the
    information should be retrieved from. This retrieved information is then saved to the newly created variables.
     */
    var storedName = localStorage.getItem("customerName");
    var storedAddress = localStorage.getItem("address");
    var storedCity = localStorage.getItem("city");
    var storedPhone = localStorage.getItem("phone");
    var storedEmail = localStorage.getItem("email");

    /*
    MM: Inserts the value of the variables created above into the innerHTML of a set of <p> tags.
     */
    document.getElementById("customerName").innerHTML = storedName;
    document.getElementById("customerAddress").innerHTML = storedAddress;
    document.getElementById("customerCity").innerHTML = storedCity;
    document.getElementById("customerPhone").innerHTML = storedPhone;
    document.getElementById("customerEmail").innerHTML = storedEmail;

    /* MM: This if statement checks if there is a "phone" value stored in local storage. If there is no value saved, it
    links the user to the login page.
     */
    // if (localStorage.getItem('phone') == null) {
    //     window.location = "Loginpage.html"
    // }
    /* MM: This line of code retrieves the innerHTML part of the HTML tag with id "loginPhone" and sets it equal to some text and
    the phone key's value stored in local storage.
     */
    document.getElementById("loginPhone").innerHTML =
        "Logget ind med ID: <br>" + localStorage.getItem("phone");

    populateOrders();
};

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
/*
MM: The deleteUser function deletes the current user from the userArray.
 */
function deleteUser() {
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
        for (var i = 0; i <= userArray.length; i++) {
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
}
