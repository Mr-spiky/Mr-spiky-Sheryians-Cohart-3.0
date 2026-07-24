import React from 'react'
import { NavLink } from 'react-router'

const Navbar = () => {
  return (
    <div>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">Products</NavLink>
      <NavLink to="/contact">Contact</NavLink>
      <NavLink to="/cart">Cart</NavLink>

    </div>
  )
}

export default Navbar
