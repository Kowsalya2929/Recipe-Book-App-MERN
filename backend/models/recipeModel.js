import mongoose from "mongoose";
import ingredientSchema from './ingrediantModel.js'

const recipeSchema = new mongoose.Schema({
    title: {type: String,required: true},
    description: {type: String,required: true},
    ingredients: [ingredientSchema],
},{timestamps: true})

export const Recipe = mongoose.model('Recipe',recipeSchema)

export default Recipe;