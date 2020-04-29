const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); //Ikke tænkt på cors lige nu
const routes = require("./api");
const db = require("./db");

function startServer() {
    // express ting
    const app = express();
    //app.use(bodyParser.urlencoded({ extended: false })); // bruger body parser, så i kan trække body direkte ud af jeres api requests. Bruges fx i POST.
    app.use(cors()); // Så i kan kommunikere med jeres frontend, når begge ting kører på samme maskine
    app.use(bodyParser.json()); // Siger body'en kommer i json format.
    // must return a Router
    app.use("/", routes.addRoutes()); // Her tilføjes jeres routes. Når i skal tilføje nye, skal redigere i hhv api/index.js samt tilføje en ny fil i api/routes

    //Establish database connection
    db.getConnection();

    //Listen to port
    app.listen(3000, err => {
        if (err) {
            process.exit(1);
            return;
        }
        console.log(`
        ################################################
        🛡️  Server listening on port: 3000🛡️ 
        ################################################
    `);
    });
}

startServer();
