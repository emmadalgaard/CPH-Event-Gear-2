// Er lavet på samme måde som routes/customer.js. Se kommentarer derinde

const express = require("express");
const route = express.Router();
const dbService = require("../../services/dbService");

const model = require("../../models/eventpackage");
const eventPackage = model.model;

// Nedenstående funktioner er defineret i dbServices, og tilpasset til eventpackages
async function getAllEventPackages() {
    return await dbService.find(eventPackage, {});
}

async function createEventPackage(data) {
    return await dbService.create(eventPackage, data);
}

async function deleteEventpackage(id) {
    return await dbService.deleteById(eventPackage, id);
}
async function updateEventpackage(id, body) {
    return await dbService.findByIdAndUpdate(eventPackage, id, body);
}

module.exports = {
    addEndpoints: async router => {
        router.use("/eventpackage", route);

        // GET
        route.get("/", (req, res) => {
            getAllEventPackages().then(result => {
                res.status(200).json(result);
            });
        });

        // POST
        // Post bruges kun til at hardcode i databasen, og findes dermed i databasen
        route.post("/", (req, res) => {
            try {
                createEventPackage(req.body).then(result => {
                    res.status(200).json(result);
                });
            } catch (e) {
                res.status(500).send(e);
            }
        });

        // DELETE
        route.delete("/delete/:id", (req, res) => {
            try {
                deleteEventpackage(req.params.id).then((result) => {
                    res.status(200).json(result);
                });
            } catch (e) {
                res.status(500).send(e);
            }
        });

        // PUT
        route.put("/update/:id", (req, res) => {
            try {
                updateEventpackage(req.params.id, req.body).then((result) => {
                    res.status(200).json(result);
                    console.log(result)
                });
            } catch (e) {
                res.status(500).send(e);
            }
        });
    }
};
