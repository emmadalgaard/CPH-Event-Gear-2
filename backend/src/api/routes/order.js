const express = require("express");
const route = express.Router();
const dbService = require("../../services/dbService");

const model = require("../../models/order");
const order = model.model;

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
        //her kan vi beskrive alle vores endpoints, som har noget med order at gøre
        route.get("/", (req, res) => {
            getAllOrders().then((result) => {
                res.status(200).json(result);
            });
        });

        route.post("/", (req, res) => {
            try {
                createOrder(req.body).then((result) => {
                    res.status(200).json(result);
                });
            } catch (e) {
                res.status(500).send(e);
            }
        });

        //DELETE
        route.delete("/delete/:id", (req, res) => {
            try {
                deleteOrder(req.params.id).then((result) => {
                    res.status(200).json(result);
                });
            } catch (p) {
                res.status(500).send(p);
            }
        });

        //PUT
        route.put("/update/:id", (req, res) => {
            try {
                updateOrder(req.params.id, req.body).then((result) => {
                    res.status(200).json(result);
                    console.log(result)
                });
            } catch (t) {
                res.status(500).send(t);
            }
        });
    },
};
