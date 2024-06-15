import mongoose from "~/mongoose.server";

interface EventInterface {
    name: string;
    type:string;
    description: string;
    logo: string;
}

const EventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
        required: true,
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