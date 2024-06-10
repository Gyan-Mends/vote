import mongoose from "~/mongoose.server";

export interface UserInterface {
  name: string;
  email: string;
  password: string;
}

const RegistrationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

let Registration: mongoose.Model<UserInterface>;

try {
    Registration = mongoose.model<UserInterface>("Registration");
} catch {
    Registration = mongoose.model<UserInterface>("Registration", RegistrationSchema);
}   

export default Registration;