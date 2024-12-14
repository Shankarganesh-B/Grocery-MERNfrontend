import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import GroceryList from './components/GroceryList';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/grocery-list" element={<GroceryList user={user} />} />
        <Route path="/" element={<Login setUser={setUser} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
