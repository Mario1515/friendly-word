const mongoose = require("mongoose");

const animalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, 'Name must be at least 2 characters'],
  },
  years: {
    type: Number,
    required: true,
    min: [1, "Year must be at least 1"],
    max: [100, "Year must be at most 100"],
  },
  kind: {
    type: String,
    required: true,
    minlength: 3,
  },
  image: {
    type: String,
    required: true,
    match: [/^https?:\/\/.+/, "Please provide a valid creature image link!"],
  },
  need: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 20
  },
  location: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 15
  },
  description: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 50,
  },
  donations: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Animal = mongoose.model("Animal", animalSchema);
module.exports = Animal;
