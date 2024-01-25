const express = require('express');
// const { app_middleware } = require('../utilities/middlewares');
require("../services/db/db_connect.js")
const app = express();
require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

/*app level middleware*/
// app.use(app_middleware);



app.use("/user", require("./app/fields/routes.js") )


app.get("*", (req, res) => {
    console.log("Opps! wrong URL");
})


app.listen(process.env.PORT, () => {
    console.log('Server is running on port ' + process.env.PORT);
})
