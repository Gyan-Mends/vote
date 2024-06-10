import mongoose from "~/mongoose.server";

export interface CategoryInterface {
    catName: string;
    description: string;
}

export interface EditionInterface {
    editionName: string;
    votePercentage: number;
    pricePerVote: number;
    description: string;
    image: string;
}

export interface ContestantInterface {
    name: string;
    stageName: string;
    nomination: string;
    image: string;
}

export interface VotePackageInterface {
    name: string;
    price: number;
    vote: number;
}

export interface UserInterface {
    name: string;
    description: string;
    type: string;
    image: string;
    email: string;
    categories: CategoryInterface[];
    editions: EditionInterface[];
    contestants: ContestantInterface[];
    votePackages: VotePackageInterface[];
}

const categorySchema = new mongoose.Schema({
    catName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
});

const editionSchema = new mongoose.Schema({
    editionName: {
        type: String,
        required: true,
    },
    votePercentage: {
        type: Number,
        required: true,
    },
    pricePerVote: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    }
});

const contestantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    stageName: {
        type: String,
        required: true,
    },
    nomination: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    }
});

const votePackageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    vote: {
        type: Number,
        required: true,
    }
});

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    categories: [categorySchema],
    editions: [editionSchema],
    contestants: [contestantSchema],
    votePackages: [votePackageSchema]
});

let Event: mongoose.Model<UserInterface>;

try {
    Event = mongoose.model<UserInterface>("Event");
} catch (error) {
    Event = mongoose.model<UserInterface>("Event", eventSchema);
}

export default Event;
