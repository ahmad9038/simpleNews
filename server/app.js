const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors(
  {
    origin: ["simple-news-server.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true
  }
));
app.use(express.json());

require("dotenv").config();
require("./dbConnection");

const router = require("./router");
app.use("/api", router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
