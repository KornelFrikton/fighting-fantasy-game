const mongoose = require("mongoose");

const pagesSchema = mongoose.Schema({
  text: {
    type: String
  },

  routes: [{ routeText: String, nextPage: Number }],

  page: {
    type: Number
  },

  enemy: {
    name: String,
    skill: Number,
    stamina: Number
  },

  reduces: {
    skill: Number,
    stamina: Number,
    luck: Number
  }
});

module.exports = mongoose.model("Page", pagesSchema, "Pages");
