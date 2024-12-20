import sendEmail from "../Utils/mailer";
import Booking from "../models/Booking";  // Import the Booking model if not already imported

export const payment = async (req, res) => {
  try {
    const { post, date, ticketQuantity, totalPrice } = req.body;

    // Validate inputs before proceeding (You can add more validations as needed)
    if (!post || !date || !ticketQuantity || !totalPrice) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Create a new booking instance
    const booking = new Booking({
      user: req.user._id,        // Assuming user ID is stored in the request object after authentication
      post,
      date,
      ticketQuantity,
      totalPrice,
    });

    // Save the booking to the database
    await booking.save();

    // Get the user's email address from the request object (assuming user info is available)
    const userEmail = req.user.email;

    // Send a confirmation email to the user
    const emailSubject = "Service Booking Confirmation";
    const emailBody = `
      <p>Dear Customer,</p>
      <p>Your booking for the service ID <strong>${post}</strong> has been confirmed.</p>
      <p><strong>Booking Date:</strong> ${date}</p>
      <p><strong>Number of Tickets:</strong> ${ticketQuantity}</p>
      <p><strong>Total Price:</strong> $${totalPrice}</p>
      <p>Thank you for choosing our service! We look forward to your visit.</p>
      <p>If you have any questions or need to modify your booking, feel free to contact us.</p>
    `;

    // Send the email
    await sendEmail(userEmail, emailSubject, emailBody);

    // Respond with success message and booking details
    res.status(200).json({
      message: "Booking Created Successfully",
      post,
      date,
      ticketQuantity,
      totalPrice,
    });
  } catch (error) {
    // Log the error for debugging purposes
    console.error(error);

    // Send error response
    res.status(500).json({
      message: "An error occurred while processing your booking.",
      error: error.message,
    });
  }
};
