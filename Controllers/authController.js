import User from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import sendEmail from "../Utils/mailer.js";

dotenv.config();
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashPassword, role });
    await newUser.save();

    // Send email after user registration
    await sendEmail(
      email,
    "Register successfully",
      `
      Welcome to ${name} Our Event Booking System!

      We're excited to have you join us! 🎉

      As a first-time user, you're just a few steps away from exploring and booking amazing events. Simply follow the easy registration process, and you’ll be all set to enjoy our platform's full features.

      If you need any help along the way, our support team is here to assist you. Enjoy your journey and happy event planning!

      Welcome aboard, and let the fun begin!
      
      Welcome to Event and you are ${role} and Never forget your password: ${password}. Have a confirmation.
      Enjoy your journey...
      `
    );
    res.status(200).json({ message: "User Registered Successfully", data: newUser });
  } catch (error) {
    console.error(error);  // Log the error to the console for debugging
    res.status(500).json({ message: error.message });
  }
};


export const loginUser = async (req, res) => {
  try {
    const { email, password, name, role } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3h",
    });

    user.token = token;

console.log(user.name)
    
    await user.save();
    res
      .status(200)
      .json({
        message: "User Logged In Successfully",
        email: user.email,
        userid: user._id,
        token:token,
        name:user.name, 
        role:user.role
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
