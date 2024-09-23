import React from 'react'
import {Header} from './components/Header';
import Sidebar from './components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AccountsTable from './components/AccountsTable';



export default function App() {
  return (
    <div className='flex'>
      <Sidebar />
      

      <div className="App">
      <Header/>
 
      <div className="App">
      <AccountsTable />
    </div>

</div>
    </div>

    
    
  )
}
