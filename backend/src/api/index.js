const customer = require("./routes/customer");
const eventPackage = require("./routes/eventpackage");
const order = require("./routes/order");
const express = require("express");

// i vores addRoutes metode samler vi  alle routes og tilføjer dem til en express router. Disse eksporteres til brug i startServer()
module.exports = {
    addRoutes: () => {

        const router = express.Router();
        customer.addEndpoints(router);
        eventPackage.addEndpoints(router);
        order.addEndpoints(router);
        return router;
    },
};
