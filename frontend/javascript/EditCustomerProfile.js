let currentCustomer_ID = "";
// global variabel som benyttes til at gemme _id for den aktuelle customer, således at PUT kan få oplyst ID på den kunde, som skal have opdateret sine data

// Laver en funktion, der henter data fra databasen og sætter det i Local Storage, så info vises på bruger
async function editUser() {
    const customerArray = await (
        await fetch("http://localhost:3000/customer")
    ).json();
    customerArray.forEach((customer) => {
        // Et if statement bruges til at tjekke, at det er en current user ved at sammenligne databasens phone med local storage, fordi phone er unikt for hver bruger
        if (customer.phone == JSON.parse(localStorage.getItem("customer")).phone) {

            document.getElementById("customerName").value = customer.customerName;
            document.getElementById("address").value = customer.address;
            document.getElementById("city").value = customer.city;
            document.getElementById("phone").value = customer.phone;
            document.getElementById("email").value = customer.email;
            document.getElementById("password").value = customer.password;
            document.getElementById("confirmPassword").value = customer.password;

            currentCustomer_ID = customer._id;
        }
    })
}

editUser();

// Se kommentarer til register funktionen i Users_customer_admin.js
async function uploadUpdatedProfile() {
    var customerName = document.getElementById("customerName").value;
    var address = document.getElementById("address").value;
    var city = document.getElementById("city").value;
    var phone = document.getElementById("phone").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    var form_valid = true;
    var validation_message = "";

    if (customerName == null || customerName == "") {
        document.getElementById('customerName').style.borderColor = "red";
        validation_message += "Venligst udfyld navn!";
        form_valid = false;
    }

    if (address == null || address == "") {
        document.getElementById('address').style.borderColor = "red";
        validation_message += "Venligst udfyld addresse!";
        form_valid = false;
    }

    if (city == null || city == "") {
        document.getElementById('city').style.borderColor = "red";
        validation_message += "Venligst udfyld by!";
        form_valid = false;
    }

    if (phone == null || phone == "") {
        document.getElementById('phone').style.borderColor = "red";
        validation_message += "Venligst udfyld telefonnummer!";
        form_valid = false;
    }

    if (email == null || email == "") {
        document.getElementById('email').style.borderColor = "red";
        validation_message += "Venligst udfyld E-mail!";
        form_valid = false;
    }

    if (password == null || password == "" || confirmPassword == null || confirmPassword == "") {
        document.getElementById('password').style.borderColor = "red";
        document.getElementById('confirmPassword').style.borderColor = "red";
        validation_message += "Venligst udfyld password!";
        form_valid = false;
    }

    if (document.getElementById("password").value != document.getElementById("confirmPassword").value) {
        document.getElementById('confirmPassword').style.borderColor = "red";
        validation_message += "Passwords er ikke ens";
        form_valid = false;
    }

    // se kommentarer i deleteUser i profile.js
    if (form_valid) {
        let c = new Customer(customerName, address, city, phone, email, password, "customer");
        await fetch("http://localhost:3000/customer/update/" + currentCustomer_ID, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(c)
        });
        localStorage.setItem("customer", JSON.stringify(c));
        alert("Din brugeroplysninger er nu opdateret");
        window.location = "profile.html";
    } else {
        alert(validation_message)
    }
}
