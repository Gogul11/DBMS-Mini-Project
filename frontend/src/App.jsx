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
        <Route path="/user/" element={<Default/>}/>
        <Route path="/user/parts" element={<List/>}/>
        <Route path="/user/category" element={<Category/>}/>
        <Route path="/user/profile" element={<Profile/>}/>
        <Route path="/user/parts/info/:id" element={<Part/>}/>
        <Route path="/user/login" element={<Login/>}/>
        <Route path="/user/register" element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
