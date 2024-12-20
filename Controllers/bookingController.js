import Booking from "../Models/bookingModel.js";
import sendEmail from "../Utils/mailer.js";
import Post from "../Models/postModel.js";

export const bookService = async (req, res) => {
  console.log("bookingservice");

  try {
    const { post, date, ticketQuantity,totalPrice ,ticketType } = req.body;

    //  const booking = new Booking({ user: req.user._id, service, date });
    const booking = new Booking({ user: req.user._id, post, date:new Date(date),totalPrice, ticketQuantity,  ticketType });

    console.log(req.user);

    await booking.save();

    //send mail
    const userEmail = req.user.email; // getting email user
    await sendEmail(
      userEmail,
      "Service Booking Confirmation",
      `Your booking for service Id ${post} is confirmed for ${date} and ${ticketQuantity} tickets`
    );
    res
      .status(200)
      .json({
        message: "Booking Created Successfully",
        post: post,
        date: date,
        ticketQuantity:ticketQuantity,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//find the post details for booking page
export const findPostDetails = async (req, res) => {
  const { _id } = req.body;
  if (!_id) {
    return res.status(400).json({ message: "Post ID is required" });
  }
  // Fetch post details
  const findDetails = await Post.findById(_id);
  if (!findDetails) {
    return res.status(404).json({ message: "Post not found" });
  }
  // console.log(_id);
  if (!findDetails) {
    return res.status(404).json({ message: "Post not found" });
  }

  res.status(200).json({ message: "get Successfully", findDetails });
};