import mongoose from 'mongoose';
import Recipe from '../models/recipeModel.js'

export const postRecipe = async(req,res)=>{
    try{
        const {title,description,ingredients} = req.body;
        if(!title || !description || !ingredients){
            return res.status(400).json({success: false,message: 'Please fill all fields'})
        }
        const created = await Recipe.create({title,description,ingredients})
        res.status(201).json({success: true,message: 'Recipe Added',data: created})
    }catch(err){
        console.log(`Post Error : ${err.message}`)
        res.status(500).json({success: false,message: 'Internal Server Error'})
    }
}

export const getAllRecipe = async(req,res)=>{
    try{
        const getAll = await Recipe.find().sort({createdAt: -1})
        res.status(200).json({success: true,message: 'Get All Recipes',data: getAll})
    }catch(err){
        console.log(`Get All Error : ${err.message}`)
        res.status(500).json({success: false,message: 'Internal Server Error'})
    }
}

export const putRecipe = async(req,res)=>{
    try{
        const {title,description,ingredients} = req.body;
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).json({success: false,message: 'Invalid Recipe Id'})
        }
        if(!title || !description || !ingredients){
            return res.status(400).json({success: false,message: 'Please fill all fields'})
        }
        const updated = await Recipe.findByIdAndUpdate(req.params.id,{title,description,ingredients},{
            new: true , // return updated doc
            runValidators: true // apply schema validation during update
        })
        if(!updated) return res.status(400).json({success: false,message: 'Recipe not found'})
        res.status(200).json({success: true,message: 'Recipe Updated',data: updated})
    }catch(err){
        console.log(`Put Error : ${err.message}`)
        res.status(500).json({success: false,message: 'Internal Server Error'})
    }
}

export const deleteRecipe = async(req,res)=>{
    try{
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).json({success: false,message: 'Invalid Recipe Id'})
        }
        const deleted = await Recipe.findByIdAndDelete(req.params.id)
        if(!deleted) return res.status(400).json({success: false,message: 'Recipe not found'})
        res.status(200).json({success: true,message: 'Recipe Deleted',data: deleted})
    }catch(err){
        console.log(`Delete Error : ${err.message}`)
        res.status(500).json({success: false,message: 'Internal Server Error'})
    }
}

