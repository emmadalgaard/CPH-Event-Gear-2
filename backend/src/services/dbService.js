//https://dev.to/pacheco/designing-a-better-architecture-for-a-node-js-api-24d

// Alle nedenstående funktioner er vores CRUD operationer (GET, DELETE, POST, PUT)
// https://coursework.vschool.io/mongoose-crud/

async function find( // find gør at vi kan hente data ned, når vi fetcher (GET)
    model, // model er en mongoose.model importeret fra models-mappen, bruges til at tilgå skemaerne
    query, // gør at vi kan filtrere på data, fx kan man få alle med: "name": "Emma" ud
    projection = { __v: 0 }, // ekskluderer __v fra den query der hentes fra databasen
    sort = { _id: 1 }, // sorterer ved hjælp af _id
    options = { lean: true } // fortæller Mongoose at den ikke skal instansiere et fuldt Mongoose dokument, men kun give POJO (plain own JavaScript objects)

) {
    return model // OBS find ud af, hvad denne return egentlig gør
        .find(query, projection, options)
        .sort(sort)
        .select({ __v: 0 })
        .exec();
}

/* async function findById(model, id) {
    return model.findById(id);
} */

async function deleteById(model, id) { // DELETE
    return model.findByIdAndDelete(id);
}

async function create(model, data) { // POST
    console.log(data);
    return model.create(data);
}

async function findByIdAndUpdate(model, id, body) { // PUT
    return model.findByIdAndUpdate(id, body);
}


// CRUD-operationerne eksporteres
module.exports = {
    find: find,
    // findById: findById,
    create: create,
    deleteById: deleteById,
    findByIdAndUpdate: findByIdAndUpdate
};
