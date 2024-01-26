let schemas ={
    users : require("./user_info")
}
let models = {}
for (let key in schemas) {
  models[key] = mongoose.model(key, schemas[key], key);
}

module.exports = { schemas, models };