const express = require("express");
const cors = require("cors");
const app = express();
const campaignRoutes = require('./routes/campaignRoutes');
const requestRoutes = require('./routes/requestRoutes');
const serverless = require("serverless-http");
require("dotenv").config()


var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });


// app.use("/", indexRouter);
// app.use("/campaign", campaignRoutes);

app.use(`/.netlify/functions/app`, campaignRoutes);
app.use(`/.netlify/functions/app/request`, requestRoutes);
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });
module.exports = app;
module.exports.handler = serverless(app);