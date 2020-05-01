//https://dev.to/pacheco/designing-a-better-architecture-for-a-node-js-api-24d
async function find(
    model, // model er en mongoose.model jævnfør de filer som hører ind under models
    query, // gør at vi kan filtrerer på data, fx kan man få alle med: "name": "Emma" ud 
    projection = { __v: 0 },
    sort = { _id: 1 },
    options = { lean: true }
) {
    return model
        .find(query, projection, options)
        .sort(sort)
        .select({ __v: 0 })
        .exec();
}
async function findById(model, id) {
    return model.findById(id);
}
async function deleteById(model, id) {
    return model.findByIdAndDelete(id);
}
async function create(model, data) {
    console.log(data);
    return model.create(data);
}

async function findByIdAndUpdate(model, id, body) {
    return model.findByIdAndUpdate(id, body);
}

module.exports = {
    find: find,
    findById: findById,
    create: create,
    deleteById: deleteById,
    findByIdAndUpdate: findByIdAndUpdate
};
