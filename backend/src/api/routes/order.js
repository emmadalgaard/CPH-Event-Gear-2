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

        //implement put (update) and delete
    },
};
