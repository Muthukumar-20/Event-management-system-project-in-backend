import mongoose from "mongoose";


const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  ticketQuantity:{
    type:Number,
    required:true,
  },
  totalPrice:{
    type:Number,
    required:true,
  },
  ticketType:{
type:String,
  },

});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
