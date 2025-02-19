import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='w-full p-2 bg-slate-100 shadow-md'>
      <div className='flex justify-center gap-2'>
          <NavLink to={'/'} className={({isActive}) =>`p-3 hover:underline ${isActive &&'font-bold'}`}>Converter</NavLink>
          <NavLink to={'/list'}className={({isActive}) =>`p-3 hover:underline ${isActive &&'font-bold'}`}>List</NavLink>
      </div>
    </div>
  )
}

export default Navbar
