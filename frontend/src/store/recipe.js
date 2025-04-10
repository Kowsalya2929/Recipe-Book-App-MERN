import { create } from 'zustand'

const useRecipeStore = create((set)=>({
    recipes: [],
    setRecipes: ((recipes)=>set({recipes})),
    getAllRecipes: async()=>{
        try{
            const res = await fetch('/api/recipes')
            const data = await res.json()
            if(!res.ok || !data.success){
                return {success: false,message: data.message}
            }
            set({recipes: data.data})
            return {success: true,message: data.message}
        }catch(err){
            console.log(`get all recipes error : ${err.message}`)
            return {success: false,message: err.message}
        }
    },
    addRecipe: async(newRecipe)=>{
        try{
            const { title, description, ingredients } = newRecipe;
            const res = await fetch('/api/recipes/',{
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(newRecipe)
            })
            const data = await res.json()
            if (!title || !description || !ingredients) {
                return { success: false, message: data.message };
            }
            if(!res.ok || !data.success){
                return {success: false,message: data.message}
            }
            set((state)=>({recipes: [...state.recipes,data.data]}))
            return {success: true,message: data.message}
        }catch(err){
            console.log(`Post error : ${err.message}`)
            return {success: false,message: err.message}
        }
    },
    deleteRecipe: async(rid)=>{
        try{
            const res = await fetch(`/api/recipes/${rid}`,{
                method: 'DELETE'
            })
            const data = await res.json()
            if(!res.ok || !data.success){
                return {success: false,message: data.message}
            }
            set((state)=> ({recipes: state.recipes.filter((r)=>r._id!==rid)}))
            return {success: true,message: data.message}
        }catch(err){
            console.log(`Delete Error : ${err.message}`)
            return {success: false,message: err.message}
        }
    },
    putRecipe: async(rid,updatedRecipe)=>{
        try{
            const res = await fetch(`/api/recipes/${rid}`,{
                method: 'PUT',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(updatedRecipe)
            })
            const data = await res.json()         
            if(!res.ok || !data.success){
                return {success: false,message: data.message}
            }
            set((state)=>({recipes: state.recipes.map((r)=> r._id === rid ? data.data : r)}))
            return {success: true,message: data.message}
        }catch(err){
            console.log(`Put Error : ${err.message}`)
            return {success: false,message: err.message}
        }
    }
}))

export default useRecipeStore;