import sendEmail from "../Utils/mailer.js";
import Booking from "../Models/bookingModel.js"; // Import the Booking model if not already imported
import Post from '../Models/postModel.js'

export const payment = async (req, res) => {
  try {
    const { post, date, ticketQuantity, totalPrice } = req.body;

    // Validate inputs
    if (!post || !date || !ticketQuantity || !totalPrice) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if the user is authenticated
    if (!req.user || !req.user._id || !req.user.email) {
      return res.status(401).json({ message: "User not authenticated." });
    }

    // Create a new booking
    const booking = new Booking({
      user: req.user._id,
      post,
      date,
      ticketQuantity,
      totalPrice,
    });

    // Save the booking to the database
    await booking.save();

    // Prepare email details
    const userEmail = req.user.email;
    const customerName = req.user.name || "Customer";
    const emailSubject = "Your Booking Confirmation";

    // Create a professional and responsive email body
    const emailBody = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            background-color: #f9f9f9;
            margin: 0;
            padding: 0;
          }
          .email-container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 20px;
          }
          .header h1 {
            color: #4CAF50;
          }
          .content p {
            color: #555555;
            margin: 10px 0;
          }
          .content strong {
            color: #333333;
          }
          .footer {
            text-align: center;
            font-size: 12px;
            color: #888888;
            margin-top: 20px;
          }
          .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #4CAF50;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
          }
          .button:hover {
            background-color: #45a049;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <h1>Booking Confirmation</h1>
          </div>
          <div class="content">
            <p>Dear <strong>${customerName}</strong>,</p>
            <p>We are excited to confirm your booking for our service. Here are your booking details:</p>
            <p><strong>Service ID:</strong> ${post}</p>
            <p><strong>Booking Date:</strong> ${date}</p>
            <p><strong>Number of Tickets:</strong> ${ticketQuantity}</p>
            <p><strong>Total Price:</strong> $${totalPrice}</p>
            <p>Thank you for choosing our service. We look forward to serving you!</p>
            <a href="https://github.com/Muthukumar-20?tab=repositories" class="button">Manage Your Booking</a>
          </div>
          <div class="footer">
            <p>This is an automated email. Please do not reply to this message.</p>
            <p>&copy; ${new Date().getFullYear()} Our Event Management Company. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send the email
    await sendEmail(userEmail, emailSubject, emailBody);

    // Respond with a success message
    res.status(200).json({
      message: "Booking created successfully and confirmation email sent.",
      booking: {
        post,
        date,
        ticketQuantity,
        totalPrice,
      },
    });
  } catch (error) {
    console.error(error);

    // Handle errors and respond
    res.status(500).json({
      message: "An error occurred while processing your booking.",
      error: error.message,
    });
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