import mongoose from "~/mongoose.server";
import { ContestantInterface } from "./interface";

const ContestantSchema = new mongoose.Schema({
    event: {
        type: String,
        require: true,
    },
    edition: {
        type: String,
        require: true,
    },
    nomination: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    code: {
        type: String,
        require: true,
    },
    image: {
        type: String,
        require: true,
    },
   
    },{
    timestamps: true,
    });

let Contestant: mongoose.Model<ContestantInterface>;

try {
    Contestant = mongoose.model<ContestantInterface>("Contestant");
} catch (error) {
    Contestant = mongoose.model<ContestantInterface>("Contestant", ContestantSchema);
}

export default Contestant;