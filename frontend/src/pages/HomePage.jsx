import React, { useEffect, useState } from 'react'
import { Box, Button, Container, IconButton, List, ListItem, Modal, Paper, TextField, Typography } from '@mui/material'
import { Add, Delete, Edit } from '@mui/icons-material'
import { toast, ToastContainer } from 'react-toastify'
import useRecipeStore from '../store/recipe'
const HomePage = () => {
  const [editOpen,setEditOpen] = useState(false)
  const handleEditOpen = (r)=>{
    setEditRecipeData(r)
    setEditOpen(true)
  }
  const handleEditClose=()=>{
    setEditOpen(false)
  }
  const [editRecipeData,setEditRecipeData] = useState(null)
  const [ingredients,setIngredients] = useState([])
  const [ingredientInput,setIngredientInput] = useState({name:"",quantity:""})
  const [newRecipe,setNewRecipe] = useState({title:"",description: ""})
  const {getAllRecipes,recipes,addRecipe,deleteRecipe,putRecipe} = useRecipeStore()
  useEffect(()=>{
    getAllRecipes()
  },[getAllRecipes])
  const handleAddIngredient=()=>{
    if(ingredientInput.name && ingredientInput.quantity){
      setIngredients([...ingredients,ingredientInput])
      setIngredientInput({name:"",quantity:""})
      return;
    }
  }
  const handleSaveRecipe=async()=>{
    const cleanedIngredients = ingredients.filter(
      (ing) => ing.name.trim() && ing.quantity.trim()
    )
    const {success,message} =await addRecipe({...newRecipe,ingredients: cleanedIngredients})
    if(!success){
      toast.error(message,{
        position:'top-center',
        draggable: true,
        closeOnClick: true,
        pauseOnHover: true,
        hideProgressBar: false,
        autoClose: 3000
      })
    }else{
      toast.success(message,{
        position:'top-center',
        draggable: true,
        pauseOnHover: true,
        hideProgressBar: false,
        autoClose: 3000,
        closeOnClick: true
      })
      setNewRecipe(()=>({title:"",description:""}))
      setIngredients([])
      await getAllRecipes()
    }
  }
  const handleDeleteRecipe=async(rid)=>{
    const {success,message} = await deleteRecipe(rid)
    if(!success){
      toast.error(message,{
        position:'top-center',
        draggable: true,
        closeOnClick: true,
        pauseOnHover: true,
        hideProgressBar: false,
        autoClose: 3000
      })
    }else{
      toast.success(message,{
        position:'top-center',
        draggable: true,
        pauseOnHover: true,
        hideProgressBar: false,
        autoClose: 3000,
        closeOnClick: true
      })
      handleEditClose()
      await getAllRecipes()
    }
  }
  const handleSaveEditRecipe = async () => {
    const updatedRecipe = {
      title: editRecipeData.title,
      description: editRecipeData.description,
      ingredients: editRecipeData.ingredients,
    }
  
    const { success, message } = await putRecipe(editRecipeData._id, updatedRecipe)
  
    if (!success) {
      toast.error(message, {
        position: 'top-center',
        draggable: true,
        closeOnClick: true,
        pauseOnHover: true,
        hideProgressBar: false,
        autoClose: 3000,
      })
    } else {
      toast.success(message, {
        position: 'top-center',
        draggable: true,
        pauseOnHover: true,
        hideProgressBar: false,
        autoClose: 3000,
        closeOnClick: true,
      })
      handleEditClose()
      await getAllRecipes()
    }
  }  
  const handleUpdateIngredientRecipe=()=>{
    const updated = [...editRecipeData.ingredients ,{name: "",quantity:""}]
    setEditRecipeData({...editRecipeData,ingredients: updated})
  }
  return (
    <Box sx={{my:2}}>
      <ToastContainer />
      <Typography variant='h6' sx={{fontSize:{md:'1.7rem',xs:'1.3rem'},fontWeight:'bold',textAlign:'center'}}>
        😋🍟 Receipe Book
      </Typography>
      <Container maxWidth='sm'>
      <Paper elevation={1} sx={{my:2,p:3,display:'flex',flexDirection:'column',borderRadius:5,border: '1px solid gray'}}>
        <Typography variant='h6' sx={{fontSize:{md:'1.4rem',xs:'1.1rem'},textAlign:'left',fontWeight:'bold',mb:2}}>
          Add a New Recipe
        </Typography>
        <TextField 
          label="Recipe Title"
          fullWidth
          sx={{my:1}}
          value={newRecipe?.title}
          onChange={(e)=>setNewRecipe({...newRecipe,title: e.target.value})}
        />
        <TextField 
          label="Recipe Description"
          multiline
          rows={2}
          fullWidth
          sx={{my:1}}
          value={newRecipe?.description}
          onChange={(e)=>setNewRecipe({...newRecipe,description: e.target.value})}
        />
        <Typography variant='h6' sx={{fontSize:{md:'1.4rem',xs:'1.1rem'},textAlign:'left',fontWeight:'bold',mb:2}}>
          Ingredients
        </Typography>
        <Box sx={{display:'flex',flexDirection:'row',gap:3}}>
        <TextField 
          label="Name"
          fullWidth
          value={ingredientInput?.name}
          onChange={(e)=>setIngredientInput({...ingredientInput,name: e.target.value})}
        />
        <TextField 
          label="Quantity"
          fullWidth
          value={ingredientInput?.quantity}
          onChange={(e)=>setIngredientInput({...ingredientInput,quantity: e.target.value})}
        /> 
        </Box>
        <Button onClick={handleAddIngredient} startIcon={<Add />} variant='text' sx={{my:2,textTransform:'capitalize',fontSize:'1rem'}}>
          Add Ingredients
        </Button>
        <Button onClick={handleSaveRecipe} variant='contained' sx={{textTransform:'capitalize',borderRadius:3,p:1,fontSize:'1.2rem',bgcolor:'green' }}>
          Save Recipe
        </Button>
      </Paper>
      {recipes.map((r)=>(
        <Paper key={r._id} elevation={1} sx={{my:2,p:3,display:'flex',flexDirection:'column',borderRadius:5,border: '1px solid gray',}}>
        <Typography variant='h6' sx={{fontSize:{md:'1.4rem',xs:'1.2rem'},textAlign:'left',fontWeight:'bold',mb:2}}>
          {r.title}
        </Typography>
        <Typography variant='h6' sx={{fontSize:{xs:'1rem',md:'1.1rem'},textAlign:'justify',mb:2}}>
          {r.description}
        </Typography>
        {r.ingredients.length > 0 && (
          <List sx={{ mb: 2 }}>
            {r.ingredients.map((i) => (
              <ListItem key={i._id}>
                <Box display="flex" gap={1}>
                  <Typography fontWeight="bold">{i.name}</Typography>
                  <Typography color="text.secondary">– {i.quantity}</Typography>
                </Box>
              </ListItem>
            ))}
          </List>
        )}

        <Box sx={{display:'flex',flexDirection:'row',justifyContent:'flex-end',gap:2}}>
        <IconButton sx={{color:'blue',borderRadius:2,bgcolor:'rgb(222, 173, 25)'}}>
          <Edit onClick={()=>handleEditOpen(r)} />
        </IconButton>
        <IconButton onClick={()=>handleDeleteRecipe(r._id)} sx={{color:'red',borderRadius:2,bgcolor:'rgb(222, 173, 25)'}}>
          <Delete />
        </IconButton>
        </Box>
      </Paper>
      ))}
      {recipes.length === 0 && (
        <Paper elevation={1} sx={{my:2,p:3,display:'flex',flexDirection:'column',borderRadius:5,border: '1px solid gray',}}>
        <Typography variant='h6' sx={{fontSize:{xs:'1rem',md:'1.1rem'},textAlign:'center',mb:2}}>
            No Recipe found
          </Typography>
        </Paper>
      )}
      </Container>
      <Modal
        open={editOpen}
        onClose={handleEditClose}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            overflowY: 'auto',
            p: 2
          }}
        >
        <Container maxWidth='sm' >
        <Paper elevation={1} sx={{my:2,p:3,display:'flex',flexDirection:'column',borderRadius:5,border: '1px solid gray',overflowY:'auto'}}>
        <Typography variant='h6' sx={{fontSize:{md:'1.4rem',xs:'1.1rem'},textAlign:'left',fontWeight:'bold',mb:2}}>
          Edit Recipe
        </Typography>
        <TextField
          label="Recipe Title"
          fullWidth
          sx={{my:1}}
          value={editRecipeData?.title}
          onChange={(e)=>setEditRecipeData({...editRecipeData,title: e.target.value})}
        />
        <TextField 
          label="Recipe Description"
          multiline
          rows={2}
          fullWidth
          sx={{my:1}}
          value={editRecipeData?.description}
          onChange={(e)=>setEditRecipeData({...editRecipeData,description: e.target.value})}
        />
        <Typography variant='h6' sx={{fontSize:{md:'1.4rem',xs:'1.1rem'},textAlign:'left',fontWeight:'bold',mb:2}}>
          Ingredients
        </Typography>
        {editRecipeData?.ingredients?.map((i,index)=>(
        <Box key={index} sx={{display:'flex',flexDirection:'row',gap:3}}>
        <TextField 
          label="Name"
          fullWidth
          value={i?.name}
          sx={{my:1}}
          onChange={(e)=>{
            const updated = [...editRecipeData.ingredients]
            updated[index].name = e.target.value
            setEditRecipeData({...editRecipeData,ingredients: updated})
          }}
        />
        <TextField 
          label="Quantity"
          fullWidth
          value={i?.quantity}
          sx={{my:1}}
          onChange={(e)=>{
            const updated = [...editRecipeData.ingredients]
            updated[index].quantity = e.target.value
            setEditRecipeData({...editRecipeData,ingredients: updated})
          }}
        /> 
        </Box>
        ))}
        <Button onClick={handleUpdateIngredientRecipe} startIcon={<Add />} variant='text' sx={{my:2,textTransform:'capitalize',fontSize:'1rem'}}>
          Add Ingredients
        </Button>
        <Box sx={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
        <Button fullWidth onClick={handleSaveEditRecipe} variant='contained' sx={{textTransform:'capitalize',borderRadius:3,p:1,fontSize:'1.2rem',bgcolor:'green' }}>
          Save Recipe
        </Button>
        <Button fullWidth onClick={handleEditClose} variant='text' sx={{textTransform:'capitalize',borderRadius:3,p:1,fontSize:'1.2rem' }}>
          Cancel
        </Button>
        </Box>
        </Paper>
        </Container>
        </Box>
      </Modal>
    </Box>
  )
}

export default HomePage