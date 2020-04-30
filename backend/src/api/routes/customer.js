const express = require("express");
const route = express.Router();
const dbService = require("../../services/dbService");

const model = require("../../models/customer");
const customer = model.model;

async function getAllCustomers() {
    return await dbService.find(customer, {});
}

async function createCustomer(data) {
    return await dbService.create(customer, data);
}

async function deleteCustomer(id) {
    return await dbService.deleteById(customer, id);
}

module.exports = {
    addEndpoints: async (router) => {
        router.use("/customer", route);

        //her kan vi beskrive alle vores endpoints, som har noget med customer at gøre.
        //GET
        route.get("/", (req, res) => {
            getAllCustomers().then((result) => {
                res.status(200).json(result);
            });

            // these are equivalent.npm
            // result = await getAllCustomers();
            // res.status(200).json(result);
            //res.status(200).send(getAllCustomers());
        });

        //POST
        route.post("/", (req, res) => {
            try {
                createCustomer(req.body).then((result) => {
                    res.status(200).json(result);
                });
            } catch (e) {
                res.status(500).send(e);
            }
        });

        //DELETE
        route.delete("/delete/:id", (req, res) => {
            try {
                deleteCustomer(req.params.id).then((result) => {
                    res.status(200).json(result);
                });
            } catch (p) {
                res.status(500).send(p);
            }
        });



        /*route.delete("/delete/:id", (req, res) => {
            const reqId = req.params.id;

            let user = customer.filter(user => {
                return user.id == reqId;
            })[0];

            const index = customer.indexOf(user);

            customer.splice(index, 1);

            res.json({message: `User ${reqId} deleted.`})
        });*/

        //PUT
    },
};
