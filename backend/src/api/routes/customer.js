const express = require("express");
const route = express.Router();
const dbService = require("../../services/dbService");
const model = require("../../models/customer");
const customer = model.model;

// Nedenstående funktioner er defineret i dbServices, og tilpasset til customer
async function getAllCustomers() {
    return await dbService.find(customer, {});
}

async function createCustomer(data) {
    return await dbService.create(customer, data);
}

async function deleteCustomer(id) {
    return await dbService.deleteById(customer, id);
}

async function updateCustomer(id, body) {
    return await dbService.findByIdAndUpdate(customer, id, body);
}

module.exports = {
    addEndpoints: async (router) => {
        router.use("/customer", route);

        //GET - READ
        route.get("/", (req, res) => {
            getAllCustomers().then((result) => {
                // getAllCustomers er en callback function, som kalder den relevante control-function, der gør brug af dbServices.find
                // denne control-function kommunikerer med modellen, og henter de relevante data
                // de relevante data kommer ind i response (res) og vises i json-format
                res.status(200).json(result);
                // Status 200 er ok
            });

        // these are equivalent.npm
        // result = await getAllCustomers();
        // res.status(200).json(result);
        // res.status(200).send(getAllCustomers());
        });

        //POST - CREATE
        route.post("/", (req, res) => {
            try {
                createCustomer(req.body).then((result) => { // vi requester en body fra view-delen, fx indtastede data i registrerings-formen
                    res.status(200).json(result);
                });
            } catch (e) {
                res.status(500).send(e);
                // Status 500 er internal server error, altså der er en fejl der forhindrer requesten i at gennemføres
            }
        });

        //DELETE
        route.delete("/delete/:id", (req, res) => { // :id viser at id'et for den givne customer skal hentes ved fetch - gør at den får en værdi
            try {
                deleteCustomer(req.params.id).then((result) => {
                    // for at få fat i id'et til ovenstående bruger vi req.params.id
                    // https://stackoverflow.com/questions/20089582/how-to-get-a-url-parameter-in-express
                    res.status(200).json(result);
                });
            } catch (e) {
                res.status(500).send(e);
            }
        });

        //PUT - UPDATE
        route.put("/update/:id", (req, res) => {
            try {
                updateCustomer(req.params.id, req.body).then((result) => { // her bruges igen req.body, da vi skal kende den givne body, for at ændre i databasen
                    res.status(200).json(result);
                    console.log(result)
                });
            } catch (e) {
                res.status(500).send(e);
            }
        });

    },
};
