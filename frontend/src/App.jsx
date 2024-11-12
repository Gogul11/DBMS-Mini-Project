import { useState } from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Default from './components/default'
import List from './components/list'
import Category from './components/category'
import Profile from './components/prof'
import Login from './components/login'
import Register from './components/register'
import Part from './components/part'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Default/>}/>
        <Route path="/parts" element={<List/>}/>
        <Route path="/category" element={<Category/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/parts/info" element={<Part/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
