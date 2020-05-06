/*
The purpose of the code is validate the input in the registration form. We achieve this by using a boolean value
that returns false if some of the text fields are invalid.
*/
async function register() {
    var customerName = document.getElementById("customerName").value;
    var address = document.getElementById("address").value;
    var city = document.getElementById("city").value;
    var phone = document.getElementById("phone").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    //The following lines of code will validate whether the inputs are valid.
    //1. Validating the form
    var form_valid = true;
    var validation_message = "";

    //2. Validating the name
    if (customerName == null || customerName == "") {
        document.getElementById('customerName').style.borderColor = "red";
        validation_message += "Venligst udfyld navn!";
        form_valid = false;
    }

    //3. Validating the address (same method as the name)
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

    //5. Validating the phone number using isNaN method
    if (phone == null || phone == "") {
        document.getElementById('phone').style.borderColor = "red";
        validation_message += "Venligst udfyld telefonnummer!";
        form_valid = false;
    }

    //6. Validating the e-mail
    if (email == null || email == "") {
        document.getElementById('email').style.borderColor = "red";
        validation_message += "Venligst udfyld E-mail!";
        form_valid = false;
    }

    //7. Validating the password(s).
    if (password == null || password == "" || confirmPassword == null || confirmPassword == "") {
        document.getElementById('password').style.borderColor = "red";
        document.getElementById('confirmPassword').style.borderColor = "red";
        validation_message += "Venligst udfyld password!";
        form_valid = false;
    }

    //This if statement checks whether the password and confirmPassword values are equal to eachother.
    if (document.getElementById("password").value != document.getElementById("confirmPassword").value) {
        document.getElementById('confirmPassword').style.borderColor = "red";
        validation_message += "Passwords er ikke ens";
        form_valid = false;
    }

    /* This statement checks whether the form is valid. If it is valid, that means that none of the above conditions have
    been met in order to make the form_valid = false.
    skriv kommentar til, hvad der sker i nedenstående rawReponse og læs op på det
    */
    //nedenstående er lavet om, så det er objektorienteret - den henter felterne fra klassen
    //Brug samme til PUT
    if (form_valid) {
        let c = new Customer(customerName, address, city, phone, email, password, "customer");
        await fetch("http://localhost:3000/customer", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(c)
        });

        alert("Ny bruger er blevet oprettet");
        window.location = "Loginpage.html";
    } else {
        alert(validation_message)
    }
}




/*
This function will validate whether the input values correspond to the values stored in localStorage.
A "for loop" is introduced to loop through the array, and an if-statement is used to check if a specific condition
is met.
The condition checks whether the input phone/password matches the phone/password of the array at index i.
If it matches, the user is sent to the front page, and the user information is stored in their respective keys.
 */

// kommentarer til denne
async function loginVal(phone, password) {
    let successCustomer = null;
    const customerArray = await (
        await fetch("http://localhost:3000/customer")
    ).json();
    customerArray.forEach((customer) => {
        if (customer.phone == phone && customer.password == password) {
            successCustomer = customer;
        }
    });
    // Vil evaluere til true, fordi JS gør, så et objekt, der er sat til en værdi, evaluerer til true
    if(successCustomer) {
        console.log("You successfully logged in");
        //sætter telefonnummer i local storage for at tjekke, om en bruger er logget ind
        //localStorage.setItem("phone", phone);
        localStorage.setItem("customer", JSON.stringify(successCustomer));

        if(successCustomer.userType == "admin") {
            window.location = "Adminpage.html"
        } else {
            window.location = "profile.html"
        }


    } else {
        alert("Wrong login, try again");
    }
    return successCustomer;
}




/*:
This function validates the login using if and else if-statements.
It retrieves the input entered, and uses an if-statement to check whether the input matches the properties in the admin1
object. The first else if statement will execute if the if statement is false. If the phone (username) entered is not
admin, it will call the loginVal function, which loops through the user array.
 */
function validate() {
    var phone = document.getElementById("phone").value;
    var password = document.getElementById("password").value;
    loginVal(phone, password);
}





window.onload = choosePhoneNumber();

async function choosePhoneNumber() {
    const customerArray = await (
        await fetch("http://localhost:3000/customer")
    ).json();
    var select = document.getElementById("phoneSelect");
    customerArray.forEach((customer) => {
        var option = customer.phone;
        var el = document.createElement("option");
        el.textContent = option;
        el.value = option;
        select.appendChild(el)
    })
}
async function showInfo() {
    const customerArray = await (
        await fetch("http://localhost:3000/customer")
    ).json();
    var select = document.getElementById("phoneSelect");
    for (let i = 0; i < customerArray.length; i++) {
        if (select.value == customerArray[i].phone) {
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
