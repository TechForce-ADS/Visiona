const express = require("express");
const routes = require("./routes");
const cors = require('cors');
const app = express();
app.use(cors());

const App = express();

app.use(express.json());
app.use(routes);






app.listen(3333, () => console.log("Server is on"))

module.exports = App;