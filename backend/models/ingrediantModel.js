import mongoose from "mongoose";

const ingrediantSchema = new mongoose.Schema({
    name: {type: String,required: true},
    quantity: {type: String,required: true}
},{timestamps: true})

export default ingrediantSchema;