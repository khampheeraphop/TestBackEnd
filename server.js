const express = require("express");
const app = express();
const cors = require("cors")
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use(express.urlencoded({extended: true}));

var corsOptions = {
    origin:"http://localhost:3000"
}

app.use(cors(corsOptions));

const db = require('./app/model');
db.sequelize.sync()
    .then(() => {
        console.log("Synced DB");
    })
    .catch(() => {
        console.log("Failed to Sync DB");
    });
    

// http://localhost:8080
app.get("/", (req, res)=>{
    res.json({message: "Welcome to default route"});
});

// http://localhost:8080/api/tutorials
require("./app/routes/student.routes")(app);

app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`);
});