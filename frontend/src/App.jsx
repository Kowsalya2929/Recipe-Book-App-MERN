import React, { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import Navbar from './components/Navbar.jsx'
import { Box, createTheme, ThemeProvider } from '@mui/material'

const App = () => {
  const [theme,setTheme] = useState('light')
  const darkTheme = createTheme({
    palette:{
      mode: theme
    }
  })
  return (
    <ThemeProvider theme={darkTheme}>
      <Box color={'text.primary'} bgcolor={'background.default'}>
        <BrowserRouter>
        <Navbar theme={theme} setTheme={setTheme} />
        <Routes>
          <Route path='/' element={<HomePage theme={theme} />} />
          <Route path='*' element={<Navigate to={'/'} />} />
        </Routes>
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  )
}

export default App