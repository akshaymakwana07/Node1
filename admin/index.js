const express = require("express");
const port = 4141;
const db=require("./config/database")

const app = express();
const routes = require("./routes")
const path = require("path")


const cookieParser = require("cookie-parser");


app.use(express.urlencoded());
app.set("view engine","ejs");
app.use(cookieParser());




app.use("/",routes)

app.use(express.static(path.join(__dirname , "Public")))
app.use("/uploads",express.static(path.join(__dirname,"uploads")))





app.listen(port,(err)=>{
    err ? console.log(err) : console.log(`server started on ${port}`);
    
});