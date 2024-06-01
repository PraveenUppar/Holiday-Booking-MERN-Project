const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  checkIn: Date,
  checkOut: Date,
  GuestName: String,
  GuestPhone: String,
  totalPrice: Number,
});

const BookingModel = mongoose.model("Booking", bookingSchema);

module.exports = BookingModel;
