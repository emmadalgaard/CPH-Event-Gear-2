// Viser en login-knap hvis man ikke er logget ind, hvis logget ind viser den hvilket nummer man er logget ind med
window.onload = function checkLoginButton() {
    if (JSON.parse(localStorage.getItem('customer')) != null) {
        var userPhone = (JSON.parse(localStorage.getItem('customer')).phone);
        //document.getElementById('loginButton').style.display = "none";
        document.getElementById('loginPhone').style.display = "";
        document.getElementById('loginPhone').innerHTML = "Logget ind med ID: <br>" + userPhone;
    }
}

// tjekker om bruger er logget ind, når denne prøver at tilgå profil-siden
function checkLoginProfilePage() {
    if (JSON.parse(localStorage.getItem('customer')) == null) {
        var confirmLoginOrder = window.confirm("Du skal være logget ind for at se din profil. Tryk OK for at logge ind.");
        if (confirmLoginOrder == true) {
            window.location = "Loginpage.html"
        }
    } else {
        window.location ="profile.html"
    }
}

