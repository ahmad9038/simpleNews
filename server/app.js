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
