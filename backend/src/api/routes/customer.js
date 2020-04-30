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

async function deleteCustomer() {
    return await dbService.create(customer,{});
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
            deleteCustomer().then((result) => {
                res.json(result);
            })
            });
        /*route.delete("/customer/delete/:id", (req, res) => {
            const requestId = req.params._id;

            let customer = customers.filter(customer => {
                return customer._id == requestId;
            })[0];

            const index = customers.idexOf(customer);

            customers.splice(index,1);

            res.json({message: `User ${requestId} deleted.`})
        });*/

        //PUT
    },
};
