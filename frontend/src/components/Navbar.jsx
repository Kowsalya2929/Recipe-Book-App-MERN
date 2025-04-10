import React from 'react'
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import { DarkMode, LightMode } from '@mui/icons-material'

const Navbar = ({theme,setTheme}) => {
  return (
    <AppBar position='sticky' sx={{backgroundColor:'brown'}}>
      <Toolbar sx={{display:'flex',justifyContent:'space-evenly',alignItems:'center'}}>
        <Typography variant='h6' sx={{fontSize:{md:'1.7rem',xs:'1.3rem'}}}>
          Receipe Book App
        </Typography>
        <IconButton sx={{color:theme === 'light'?'orange':'white',backgroundColor:'rgb(85, 85, 85)'}} onClick={()=>setTheme(theme==='light'?'dark':'light')}>
          {theme === 'light' ? <LightMode /> : <DarkMode />}
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar