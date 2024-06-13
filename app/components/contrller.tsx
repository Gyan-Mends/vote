// app/services/registrationService.ts
import bcrypt from 'bcryptjs'; // Import bcrypt
import Registration from "~/modal/registration";

export async function saveRegistration(name: string, email: string, password: string) {
  try {
    // Check if email already exists
    const existingRegistration = await Registration.findOne({ email });

    if (existingRegistration) {
      throw new Error('Email already exists');
    }

    // Hash the password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // If email doesn't exist, create a new registration with hashed password
    const newRegistration = new Registration({ name, email, password: hashedPassword });
    const response = await newRegistration.save();

    return response; // Return the saved registration document
  } catch (error: any) {
    throw new Error(error.message);
  }
}


