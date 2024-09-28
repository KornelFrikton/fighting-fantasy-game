const express = require("express");
const app = express();

const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000"
}

require("dotenv").config();

// app.listen(8000);

const mongoose = require("mongoose");

mongoose.connect(process.env.URL).then(() => {
  const PORT = process.env.PORT || 8000
  app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
  })
}).catch(error => {
  console.log(error);
})

mongoose.connect(process.env.URL);
mongoose.connection.on('connected', () => console.log('Mongoose DB has been connected'));
mongoose.connection.on('error', () => console.log('Connection error'));


app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const Page = require('./models/book');

app.get("/api", async (req, res) => {
  try {
    const allPages = await Page.find();
    res.send(allPages);
  } catch (error) {
    res.json({ error });
  }
});
