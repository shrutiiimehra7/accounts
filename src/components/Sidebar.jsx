import React from 'react';
import { BsHouse } from 'react-icons/bs';
import { CiLogout } from 'react-icons/ci';

import { Link } from 'react-router-dom';


function Sidebar() {
  return (
    <div className='fixed top-0 left-0 flex h-full bg-gradient-to-r from-blue-300 to-blue-500'>
      <aside style={sidebarStyle}>
        {/* Logo with Link to Home */}
        <Link to="/">
          <img src='./verity.png' alt="Logo" />
        </Link>

        <div className="flex flex-col gap-2 pl-3 m-4 text-xl w-55"> 
          <Link to="/" className="flex items-center gap-2 px-5 py-2 rounded-md hover:bg-gray-100">
            <BsHouse fontSize={20}/> Home
          </Link>

          <div className="absolute inset-x-25 bottom-10">
            <Link to="/logout" className="flex items-center gap-1 px-5 py-2 text-red-600 rounded-md hover:bg-gray-100">
              <CiLogout color="red" fontSize={20} /> Log Out
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
}




const sidebarStyle = {
  width: '225px',
  backgroundColor: 'bg-gradient-to-r from-indigo-500 ...',
  height: '120vh',
  padding: '15px',
  boxSizing: 'border-box',
  
  left: '0',
  top: '0'
};

const listStyle = {
  listStyleType: 'none',
  padding: '0'
};

const linkStyle = {
  textDecoration: 'none',
  color: '#333',
  display: 'block',
  padding: '10px 0',
  fontSize: '20px',
  color: '#ffff'
};



export default Sidebar;