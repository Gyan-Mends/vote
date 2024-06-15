import mongoose from "~/mongoose.server";
import { CategoryInterface } from "./interface";

const CategorySchema = new mongoose.Schema({
    event: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    category: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    },{
    timestamps: true,
    });

let Categories: mongoose.Model<CategoryInterface>;

try {
    Categories = mongoose.model<CategoryInterface>("Category");
} catch (error) {
    Categories = mongoose.model<CategoryInterface>("Category", CategorySchema);
}

export default Categories;