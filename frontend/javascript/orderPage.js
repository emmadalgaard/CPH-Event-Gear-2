/*MK/MM:
This function check if the user is logged in. localStorage.getItem takes the information from the chosen key saved
in localStorage (here we use the 'phone' key), and checks if there are is any value saved to the key. If not, the user
is redirected to the login page. In addition, the function also inserts the users phone number in the navibar as text.
 */
//Function written by: MM
window.onload = function checkLoginButton() {
    //document.getElementById('loginPhone').innerHTML="Logget ind med ID: <br>" + JSON.parse(localStorage.getItem('customer')).phone;

    //checks if the user is logged in and redirects to loginpage if not
    // (this is used if the user is linked directly to this page and have not logged in or registered before.)
    if (JSON.parse(localStorage.getItem('customer')).phone == null) {
        window.location = "Loginpage.html"
    }
}
//MK: The purpose of this function is to make sure that the user of the website cannot enter the orderPage if the user is not logged in.
//This function uses the same if statement as the function above but here it is an if else statement. The difference is mainly that this function is activated when a button is clicked.
//This if statement locate the user to either the loginPage or the orderPage. If the key in local storage is null they direct to loginPage else the user goes to orderPage where the order can be made.
//Function written by: MM
function checkLoginOrderPage() {
    if (JSON.parse(localStorage.getItem('customer')).phone == null) {
        window.location = "Loginpage.html"
    } else {
        window.location ="orderPage.html"
    }
}
//MK: This function has the same purpose and uses the same if else statement as the one above.
//MK: But this is for the profilePage. This means that if the user of the programme is logged in it can now see information about the profile and orders.
//Function written by: MM
function checkLoginProfilePage() {
    if (JSON.parse(localStorage.getItem('customer')).phone == null) {
        window.location = "Loginpage.html"
    } else {
        window.location ="profile.html"
    }
}
/*MM/MK: The following function is activated by the confirm time button. It has the following purposes:
1. It checks if the date/time values have been filled out, and displays an error if not.
2. It checks if there already are reservations for the given time/date, and adjusts the amount of jetskis shown.
 */
//Function written by: MM
async function confirmTime() {
    /* MK/MM Creating variables that represent the user selection of date and time we assign the variable to the different elementID's from our HTML
    */
    var rentDayID = document.getElementById("rentDay");
    var rentDayValue = rentDayID.options[rentDayID.selectedIndex].value;
    var rentMonthID = document.getElementById("rentMonth");
    var rentMonthValue = rentMonthID.options[rentMonthID.selectedIndex].value;
    var rentYearID = document.getElementById("rentYear");
    var rentYearValue = rentYearID.options[rentYearID.selectedIndex].value;


    //MM: Tests if the variables set before are equal to 00 (haven't been set).
    //MM: If the variables have been set, it changes the display property from "none" to "", showing all the jetski models
    //and all the jetski amounts.
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
    } else { //MM: If the user has not filled out alle the date/time fields, an error is shown:
        alert("Udfyld venligst alle felter.");
    }
    /*
       MM:
       Two variables are created. The variable "orderAmount" is set equal to the length of the array "orderArray" that is saved in local storage.
        */
    const orderArray = await (
        await fetch("http://localhost:3000/order")
    ).json();

    var orderAmount = orderArray.length;
    //var orderArray = JSON.parse(localStorage.getItem('orderArray'));
    //MK: Three new variables are created for occupiedAmount1/2/3 which refers to the jetskis. They are defined using number 0 because they as a standard are not rented.
    var occupiedAmount1 = 0;
    var occupiedAmount2 = 0;
    var occupiedAmount3 = 0;

    /*MK/MM: A loop is created to cycle through all registered order and count the occupied jetskis for the selected period.
    The purpose of this loop is that only available jetskis are shown, and that jetskis that are already reserved are hidden.
    The loop uses the orderAmount and the orderArray variables.
     */
    for (var i = 0; i < orderAmount; i++) {
        if (rentDayValue == orderArray[i].orderDay && rentMonthValue == orderArray[i].orderMonth && rentYearValue == orderArray[i].orderYear) {
            //MM:Counts the amount of jetski1 reserved and adds to the var
            if (orderArray[i].amount1 == 1) {
                occupiedAmount1++;
            } else if (orderArray[i].amount1 == 2) {
                occupiedAmount1+=2;
            } else if (orderArray[i].amount1 == 3) {
                occupiedAmount1+=3;
            }
            //MM:Counts the amount of jetski2 reserved and adds to the var
            if (orderArray[i].amount2 == 1) {

                occupiedAmount2++;
            } else if (orderArray[i].amount2 == 2) {
                occupiedAmount2+=2;
            } else if (orderArray[i].amount2 == 3) {
                occupiedAmount2+=3;
            }
            //MM:Counts the amount of jetski3 reserved and adds to the var
            if (orderArray[i].amount3 == 1) {
                occupiedAmount3++;
            } else if (orderArray[i].amount3 == 2) {
                occupiedAmount3+=2;
            } else if (orderArray[i].amount3 == 3) {
                occupiedAmount3+=3;
            }
        }
    }

    //MK: This if statement corrects the amount of jetski 1 if there are any reserved
    if (occupiedAmount1 == 1) {
        document.getElementById('eventpackage1Amount3').style.display = "none";
    } else if (occupiedAmount1 == 2) {
        document.getElementById('eventpackage1Amount3').style.display = "none";
        document.getElementById('eventpackage1Amount2').style.display = "none";
        //MM:The following condition is set to >= in case a bug occurs and the amount of reserved jetskis exceeds 3.
    } else if (occupiedAmount1 >= 3) {
        document.getElementById("modelContainer1").style.display = "none";
    }
    //MK: This if statement corrects the amount of jetski 2 if there are any reserved
    if (occupiedAmount2 == 1) {
        document.getElementById('eventpackage2Amount3').style.display = "none";
    } else if (occupiedAmount2== 2) {
        document.getElementById('eventpackage2Amount3').style.display = "none";
        document.getElementById('eventpackage2Amount2').style.display = "none";
        //MM:The following condition is set to >= in case a bug occurs and the amount of reserved jetskis exceeds 3.
    } else if (occupiedAmount2 >= 3) {
        document.getElementById("modelContainer2").style.display = "none";
    }
    //MK: This if statement corrects the amount of jetski 3 if there are any reserved
    if (occupiedAmount3 == 1) {
        document.getElementById('eventpackage3Amount3').style.display = "none";
    } else if (occupiedAmount3 == 2) {
        document.getElementById('eventpackage3Amount3').style.display = "none";
        document.getElementById('eventpackage3Amount2').style.display = "none";
        //MM: The following condition is set to >= in case a bug occurs and the amount of reserved jetskis exceeds 3.
    } else if (occupiedAmount3 >= 3) {
        document.getElementById("modelContainer3").style.display = "none";
    }
}

// get på eventpackage skal implementeres her
/*async function showEventpackages() {
    console.log("is this run");
    const eventpackageArray = await (
        await fetch("http://localhost:3000/eventpackage")
    ).json();

    eventpackageArray.forEach((eventpackage) => {
        console.log(eventpackage);

        document.getElementById("eventpackage1Text").innerHTML = eventpackage.eventpackage1Text;
        document.getElementById("customerAddress").innerHTML = customer.address;
        document.getElementById("customerCity").innerHTML = customer.city;
        document.getElementById("customerPhone").innerHTML = customer.phone;
        document.getElementById("customerEmail").innerHTML = customer.email;
    })
}
// Kalder funktionen for at få info frem
window.onload = () => {
    showEventpackages();
}*/

//MM: Objects are created from the Jetski class, representing the different jetski models.
var eventpackage1= new Eventpackage('Rund fødselsdag', 3000);
var eventpackage2= new Eventpackage('Bryllup', 2000);
var eventpackage3= new Eventpackage('Studentgilde', 4000);
//the Object.freeze is used to make sure customers can't change the price property of the objects.
Object.freeze(eventpackage1);
Object.freeze(eventpackage2);
Object.freeze(eventpackage3);


/*MM: The following function is activated when the user changes the amount of jetskis in the HTML selector. It does the following:
1. It adds up the total price of the selected jetskis and shows it in the basket.
2. It shows the basket if the amount of jetskis is above 0.
3. It shows the name of the jetski, the photo, and the price of the selected jetskis in the basket.
 */
//Function written by: MM
function calculatePrice() {
    var orderAmount1JS = document.getElementById('orderAmount1').value;
    var orderAmount2JS = document.getElementById('orderAmount2').value;
    var orderAmount3JS = document.getElementById('orderAmount3').value;
    var finalPrice = orderAmount1JS * eventpackage1.price + orderAmount2JS * eventpackage2.price + orderAmount3JS * eventpackage3.price;
    document.getElementById('totalPrice').innerHTML = "Samlet Pris: " + finalPrice + " kr.";
    document.getElementById('basketDivFull').style.display = "";

    //MM:Checks if all order amounts are 0, then the basket should be hidden
    if (orderAmount1JS == 0 && orderAmount2JS == 0 && orderAmount3JS == 0)
        document.getElementById('basketDivFull').style.display = "none";

    /* MM: Checks if the order amount if above 0, and if so, it adds the jetski name, photo, price and amount to the <p> in the basket.
    If the order amount is 0, it empties the <p> so that the element is hidden in the basket */
    if (orderAmount1JS > 0) {
        document.getElementById('basketEventpackage1').innerHTML = "<img style=\"width:30%; float:left; \" src=\"../images/50år.png\"> Rund Fødselsdag <br> Antal: " + orderAmount1JS + "<br> Pris: " + orderAmount1JS * eventpackage1.price + " kr.";
    } else {
        document.getElementById('basketEventpackage1').innerHTML = "";
    }
    if (orderAmount2JS > 0) {
        document.getElementById('basketEventpackage2').innerHTML = "<br><img style=\"width:30%; float:left; \" src=\"../images/Bryllup.png\"> Bryllup VX <br> Antal: " + orderAmount2JS + "<br> Pris: " + orderAmount2JS * eventpackage2.price + " kr.";
    } else {
        document.getElementById('basketEventpackage2').innerHTML = "";
    }
    if (orderAmount3JS > 0) {
        document.getElementById('basketEventpackage3').innerHTML = "<br><img style=\"width:30%; float:left; \" src=\"../images/Studentergilde.png\"> Studentergilde <br> Antal: " + orderAmount3JS + "<br> Pris: " + orderAmount3JS * eventpackage3.price + " kr.";
    } else {
        document.getElementById('basketEventpackage3').innerHTML = "";
    }
}

//MK: This function's purpose is to store the created order in the database.
async function storeOrder() {
    // MK:Variables are created for the amount picked of the three different types of Jetski.
    var orderAmount1JS = document.getElementById('orderAmount1').value;
    var orderAmount2JS = document.getElementById('orderAmount2').value;
    var orderAmount3JS = document.getElementById('orderAmount3').value;
    // Variables are created for day, month and year.
    var orderDay = document.getElementById('rentDay').value;
    var orderMonth = document.getElementById('rentMonth').value;
    var orderYear = document.getElementById('rentYear').value;

    let phone = JSON.parse(localStorage.getItem("customer")).phone;
    let orderId = null;
    // MK/MM: A variable is created to calculate the final price of the order.
    // MK: Totalprice = Amount picked of jetski1 * jetski1's price + Amount picked of jetski2 * jetski2's price and so on...
    var finalPrice = orderAmount1JS * eventpackage1.price + orderAmount2JS * eventpackage2.price + orderAmount3JS * eventpackage3.price;

    let o = new Order(orderId, phone, orderAmount1JS, orderAmount2JS, orderAmount3JS, orderDay, orderMonth, orderYear, finalPrice);
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





