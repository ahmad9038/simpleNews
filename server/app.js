const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: 'https://simple-news-client.vercel.app', // or your specific origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://simple-news-client.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
// app.options('*', cors());
// app.use(cors());
app.use(express.json());

require("dotenv").config();
require("./dbConnection");

const router = require("./router");
app.use("/api", router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
