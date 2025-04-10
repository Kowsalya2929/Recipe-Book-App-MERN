import express from 'express'
import { deleteRecipe, getAllRecipe, postRecipe, putRecipe } from '../controllers/recipeController.js'

const router = express.Router()

router.post('/',postRecipe)
router.get('/',getAllRecipe)
router.put('/:id',putRecipe)
router.delete('/:id',deleteRecipe)

export default router;