
import { RegistrationInterface } from "~/interface";
import mongoose from "~/mongoose.server";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Define the schema
const RegistrationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [emailRegex, 'Please fill a valid email address'],
  },
  password: {
    type: String,
    required: true,
  },
});

// Declare the model variable
let Registration: mongoose.Model<RegistrationInterface>;

try {
  // Try to retrieve the existing model to avoid recompilation issues
  Registration = mongoose.model<RegistrationInterface>("Registration");
} catch (error) {
  // If the model does not exist, create a new one
  Registration = mongoose.model<RegistrationInterface>("Registration", RegistrationSchema);
}

export default Registration;