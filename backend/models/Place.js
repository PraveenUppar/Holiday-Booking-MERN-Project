const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
  title: String,
  address: String,
  description: String,
  perks: [String],
  checkIn: String,
  checkOut: String,
  guests: Number,
  price: Number,
  cover: String,
  contact: Number,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const PlaceModel = mongoose.model("Place", placeSchema);

module.exports = PlaceModel;
