// app/services/registrationService.ts
import { redirect } from '@remix-run/node';
import bcrypt from 'bcryptjs'; // Import bcrypt
import Registration from "~/modal/registration";
import { getSession,commitSession } from '~/session';

// Registration Controller
// Registration Controller
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

// Login contoller
// Login contoller
export async function loginController(email:string, password:string){
  try {
    //checking if email and password exist
    const loginValidation = await Registration.findOne({email, password})

    // returning message when email and password does not exist
    if(!loginController){
      throw new Error("Inavalid email or password")
    }else{
      return redirect("/register")
    }

  } catch (error:any) {
    throw new Error(error.message)
  }
}


