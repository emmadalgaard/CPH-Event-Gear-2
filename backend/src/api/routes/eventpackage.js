const express = require("express");
const route = express.Router();
const dbService = require("../../services/dbService");

const model = require("../../models/eventpackage");
const eventPackage = model.model;

async function getAllEventPackages() {
    return await dbService.find(eventPackage, {});
}

async function createEventPackage(data) {
    return await dbService.create(eventPackage, data);
}

module.exports = {
    addEndpoints: async router => {
        router.use("/eventpackage", route);
        //her kan vi beskrive alle vores endpoints, som har noget med eventpackage at gøre
        route.get("/", (req, res) => {
            getAllEventPackages().then(result => {
                res.status(200).json(result);
            });
            //res.status(200).send(getAllEventPackages());
        });

        //Skal vi bruge en post i denne her situation? Er det nødvendigt, at en pakke kan postes op?
        route.post("/", (req, res) => {
            try {
                createEventPackage(req.body).then(result => {
                    res.status(200).json(result);
                });
            } catch (e) {
                res.status(500).send(e);
            }
        });

        //implement put (update) and delete
    }
};
