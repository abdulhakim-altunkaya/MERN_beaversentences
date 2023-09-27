const express = require("express");
const app = express();

app.get("/api", (req, res) => {
    res.json({message: "Hello from the server my good sir"})
})

const server = app.listen(process.env.PORT || 5000);
const portNumber = server.address().port;
console.log(`ГОСПОДИН ПОРТ СЕИЧАС ОТКРЫТ ${portNumber}`);
