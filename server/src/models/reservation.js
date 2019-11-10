import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    guestName: String,
    hotelName: String,
    arrivalDate: Date,
    departureDate: Date
  },
  { collection: "reservation" }
);

const Reservation = mongoose.model("Reservation", reservationSchema);

export default Reservation;
