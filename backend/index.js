const express = require('express');
let bodyparse = require('body-parser');
const mongoose = require('mongoose');
const {Schema} =mongoose;
const cors = require('cors');
const app = express();
app.use(bodyparse.json())
const { errorHandler } = require("./middlewares/error-handler.middleware")
const { routeNotFound } = require("./middlewares/route-not-found.middleware")
app.use(cors());
//const cart = require("./routes/cart.router.js");
const playlist=require("./routes/playlist.router.js")
const history=require("./routes/history.router.js")
const liked=require("./routes/liked.router.js")
const video=require("./routes/video.router.js")

//mongoose conn
mongoose.connect('mongodb+srv://utpal:utpalpati@cluster0.pxyfi.mongodb.net/videolib?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{console.log("mongoose connected")}).catch(eror=>{console.log("mongoose connection problem",error)})



app.get("/", (req, res) => {
  // throw Error("galat")
  res.send("nahi he")
})


app.use('/playlist', playlist);
app.use('/history',history)
app.use("/liked",liked);
app.use("/video",video)
app.use(routeNotFound);

app.use(errorHandler);

app.listen(3000, () => {
  console.log('server started');
});