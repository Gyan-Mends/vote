import mongoose from "~/mongoose.server";
import { EditionInterface } from "./interface";

const EditionSchema = new mongoose.Schema({
    event: {
        type: String,
        require: true,
    },
    logo: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    price: {
        type: String,
        require: true,
    },
    },{
    timestamps: true,
    });

let Edition: mongoose.Model<EditionInterface>;

try {
    Edition = mongoose.model<EditionInterface>("Edition");
} catch (error) {
    Edition = mongoose.model<EditionInterface>("Edition", EditionSchema);
}

export default Edition;