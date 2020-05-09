const customer = require("./routes/customer");
const eventPackage = require("./routes/eventpackage");
const order = require("./routes/order");
const express = require("express");

// i vores addRoutes metode samler vi  alle routes og tilføjer dem til en express router. Disse eksporteres til brug i startServer()
module.exports = {
    addRoutes: () => {
        // Routes er en minificeret del af express app, en mindre del af app
        // Router er noget funktionalitet, der bruger appen, men når den defineres, er det en mindre del
        const router = express.Router();
        customer.addEndpoints(router);
        eventPackage.addEndpoints(router);
        order.addEndpoints(router);
        return router;
    },
};
