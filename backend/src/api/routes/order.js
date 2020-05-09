// Er lavet på samme måde som routes/customer.js. Se kommentarer derinde
const express = require("express");
const route = express.Router();
const dbService = require("../../services/dbService");

const model = require("../../models/order");
const order = model.model;

// Nedenstående funktioner er defineret i dbServices, og tilpasset til order
async function getAllOrders() {
    return await dbService.find(order, {});
}

async function createOrder(data) {
    return await dbService.create(order, data);
}

async function deleteOrder(id) {
    return await dbService.deleteById(order, id);
}
async function updateOrder(id, body) {
    return await dbService.findByIdAndUpdate(order, id, body);
}

module.exports = {
    addEndpoints: async (router) => {
        router.use("/order", route);

        // GET
        route.get("/", (req, res) => {
            getAllOrders().then((result) => {
                res.status(200).json(result);
            });
        });

        // POST
        route.post("/", (req, res) => {
            try {
                createOrder(req.body).then((result) => {
                    res.status(200).json(result);
                });
            } catch (e) {
                res.status(500).send(e);
            }
        });

        // DELETE
        route.delete("/delete/:id", (req, res) => {
            try {
                deleteOrder(req.params.id).then((result) => {
                    res.status(200).json(result);
                });
            } catch (e) {
                res.status(500).send(e);
            }
        });

        // PUT
        route.put("/update/:id", (req, res) => {
            try {
                updateOrder(req.params.id, req.body).then((result) => {
                    res.status(200).json(result);
                    console.log(result)
                });
            } catch (e) {
                res.status(500).send(e);
            }
        });
    },
};
