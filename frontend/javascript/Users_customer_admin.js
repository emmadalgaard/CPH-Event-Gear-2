
// Nedenstående funktion validerer inputs i registreringsformen, ved at bruge en boolean, der returnerer false hvis nogle tekstfelter ikke opfylder kravene
async function register() {
    var customerName = document.getElementById("customerName").value;
    var address = document.getElementById("address").value;
    var city = document.getElementById("city").value;
    var phone = document.getElementById("phone").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    // Følgende vil validere om inputs er valide
    //1. Validerer formen
    var form_valid = true;
    var validation_message = "";

    //2. Validerer navnet
    if (customerName == null || customerName == "") {
        document.getElementById('customerName').style.borderColor = "red";
        validation_message += "Venligst udfyld navn!";
        form_valid = false;
    }

    //3. Validerer adressen
    if (address == null || address == "") {
        document.getElementById('address').style.borderColor = "red";
        validation_message += "Venligst udfyld addresse!";
        form_valid = false;
    }

    //4. Validating the City
    if (city == null || city == "") {
        document.getElementById('city').style.borderColor = "red";
        validation_message += "Venligst udfyld by!";
        form_valid = false;
    }

    //5. Validerer telefonnummeret
    if (phone == null || phone == "") {
        document.getElementById('phone').style.borderColor = "red";
        validation_message += "Venligst udfyld telefonnummer!";
        form_valid = false;
    }

    //6. Validerer emailen
    if (email == null || email == "") {
        document.getElementById('email').style.borderColor = "red";
        validation_message += "Venligst udfyld E-mail!";
        form_valid = false;
    }

    //7. Validerer passwordet
    if (password == null || password == "" || confirmPassword == null || confirmPassword == "") {
        document.getElementById('password').style.borderColor = "red";
        document.getElementById('confirmPassword').style.borderColor = "red";
        validation_message += "Venligst udfyld password!";
        form_valid = false;
    }

    // Tjekker om password er lig hinanden
    if (document.getElementById("password").value != document.getElementById("confirmPassword").value) {
        document.getElementById('confirmPassword').style.borderColor = "red";
        validation_message += "Passwords er ikke ens";
        form_valid = false;
    }

    // Hvis ovenstående er korrekt udfyldt opretter den en ny customer i databasen på baggrund af klassen Customer med POST-metoden, ellers alertes der hvad der mangler
    if (form_valid) {
        let c = new Customer(customerName, address, city, phone, email, password, "customer");
        // ved at sætte userTypen til customer, undgår vi at man kan oprette sig som Admin - alle oprettede brugere vil komme i databasen som en customer i userType
        await fetch("http://localhost:3000/customer", { // den URL-adresse er gældende for metoden POST (og GET) i routes/customer.js
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                // viser at vi bruger json-format, når der sendes fra client, og det er dermed det den accepterer
            },
            body: JSON.stringify(c) // laver JavaScript formatet fra instansen af klassen om til json, så det kan bruges i databasen
        });

        alert("Ny bruger er blevet oprettet");
        window.location = "Loginpage.html";
    } else {
        alert(validation_message)
    }
}

// Tjekker om man kan logge ind med det indtastede i HTML'en
async function loginVal(phone, password) {
    let successCustomer;
    const customerArray = await (
        await fetch("http://localhost:3000/customer")
    ).json();
    customerArray.forEach((customer) => { // hvert objekt i customerArray løbes igennem
        if (customer.phone == phone && customer.password == password) {
            // hvis det indtastede telefonnummer og kodeord er lig en oprettet customer, sættes successCustomer variablen til at være den indtastede customer-objekt
            successCustomer = customer;
        }
    });
    if(successCustomer) { // Vil evaluere til true, fordi JS gør, så et objekt, der er sat til en værdi, evaluerer til true
        console.log("You successfully logged in");
        localStorage.setItem("customer", JSON.stringify(successCustomer));
        // Vi sætter customer-objektet i local storage, så vi kan bruge dataene fra den givne customer til resten af programmets customer-funktioner
        // Dette anses for at være en sikkerhedsbrist - alternativt skulle der bruges cookies

        // Tjekker userType på indloggede customer, og dermed hvilken interface der skal vises
        if(successCustomer.userType == "admin") { // admin er hardcoded i databasen, og der findes dermed kun én instans med denne userType
            window.location = "Adminpage.html"
        } else {
            window.location = "profile.html"
        }
    } else {
        alert("Wrong login, try again");
    }
    return successCustomer;
}

// Hentes fra HTML ved en onclick-funktion, og kalder loginVal, så brugeren kan logge ind
function validate() {
    var phone = document.getElementById("phone").value;
    var password = document.getElementById("password").value;
    loginVal(phone, password);
}


window.onload = choosePhoneNumber();

// Funktion på admin-siden til at hente data på en bruger fra et givet telefonnummer
async function choosePhoneNumber() {
    const customerArray = await (
        await fetch("http://localhost:3000/customer")
    ).json();
    var select = document.getElementById("phoneSelect"); // select variablen defineres som rul-ud menuen i HTML'en
    customerArray.forEach((customer) => { // kører alle objekterne i arrayet igennem
        var option = customer.phone; // option defineres til at være brugerens telefonnummer
        var el = document.createElement("option"); // der oprette options i select-menuen alt efter hvor mange objekter der er i arrayet
        el.textContent = option; // teksten i option skal vises som telefonnummeret på customer
        el.value = option; // værdien skal ligeledes være telfonnummeret på customer
        select.appendChild(el) // tilføjer til rul-ud menuen HTML'en
    })
}

// Viser info på en bruger ved onclick på "vis brugeroplysninger", når der er valgt et tlf-nummer i rul-ud menuen
async function showInfo() {
    const customerArray = await (
        await fetch("http://localhost:3000/customer")
    ).json();
    var select = document.getElementById("phoneSelect");
    for (let i = 0; i < customerArray.length; i++) { // der kører et for-loop for alle objekterne i customerArray
        if (select.value == customerArray[i].phone) {
        // hvis den valgte værdi (telefonnummeret) er lig et telefonnummer i arrayet, vil den tilføje informationen på brugeren tilknyttet til det telefonnummer i HTML
            document.getElementById('customerName').innerHTML = customerArray[i].customerName;
            document.getElementById('customerAddress').innerHTML = customerArray[i].address;
            document.getElementById('customerCity').innerHTML = customerArray[i].city;
            document.getElementById('customerPhone').innerHTML = customerArray[i].phone;
            document.getElementById('customerEmail').innerHTML = customerArray[i].email;
        }
    }
}


/*async function showOrder() {
    const orderArray = await (
        await fetch("http://localhost:3000/order")
    ).json();
    var select = document.getElementById("phoneSelect");
    for (let i = 0; i < orderArray.length; i++) {
        if (select.value == orderArray[i].phone) {

            var orderInfo = document.createElement("P");
            var rundFodselsdag = "Rund fødselsdag:";
            var bryllup = "Bryllup:";
            var studentergilde = "Studentergilde:"

            orderInfo.innerHTML =
                `Dato for udlejning:
                ${orderArray[i].orderDay} / ${orderArray[i].orderMonth} / ${orderArray[i].orderYear}
                <br> <br>
                ${orderArray[i].amount1 ? rundFodselsdag + orderArray[i].amount1 + "<br>" : ""}
                ${orderArray[i].amount2 ? bryllup + orderArray[i].amount2 + "<br>" : ""}
                ${orderArray[i].amount3 ? studentergilde + orderArray[i].amount3 + "<br>" : ""}
                <br>
                Samlet pris til betaling ved udlejning: ${orderArray[i].orderPrice}<br><br>
                Ordre ID: ${orderArray[i]._id}
                <hr>`
console.log(orderInfo);
            document.getElementById('orderDetails').appendChild(orderInfo);
            document.getElementById('noOrders').innerHTML = "";
        //} else if (select.value !== orderArray[i].phone) {
           // document.getElementById('orderDetails').innerHTML = "";
        }
    }
}*/
