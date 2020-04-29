const customer = require("./routes/customer");
const eventPackage = require("./routes/eventpackage");
const order = require("./routes/order");
const express = require("express");

// i jeres addRoutes metode samler i bare alle routes og tilføjer dem til en express router.
module.exports = {
    addRoutes: () => {
        //routes er en minificeret del af express app, en mindre del af app. Router er noget funktionalitet, der bruger appen, men når den defineres, er det en mindre del
        const router = express.Router();
        customer.addEndpoints(router);
        eventPackage.addEndpoints(router);
        order.addEndpoints(router);
        //login.addEndpoints(router) kunne være et eksempel på en anden metode. Bemærk at så skal i have en login.js fil under routes, og den skal importeres i toppen af den her fil, ligesom med user.
        return router;
    },
};
