import sendEmail from "../Utils/mailer";


export const payment = async (req, res) => {
  
    try {
      const { post, date, ticketQuantity,totalPrice } = req.body;
  
      //  const booking = new Booking({ user: req.user._id, service, date });
      const payment = new Booking({ post, date,totalPrice, ticketQuantity });
  
    //   console.log(req.user);
  
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
  