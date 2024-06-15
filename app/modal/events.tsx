import mongoose from "~/mongoose.server";
import { EventInterface } from "./interface";

const EventSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    type: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    logo: {
        type: String,
        require: true,
    },
    },{
    timestamps: true,
    });

let Events: mongoose.Model<EventInterface>;

try {
    Events = mongoose.model<EventInterface>("Event");
} catch (error) {
    Events = mongoose.model<EventInterface>("Event", EventSchema);
}

export default Events;