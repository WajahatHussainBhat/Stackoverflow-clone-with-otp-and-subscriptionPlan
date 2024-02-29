import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

const User = ({user}) => {
  const darkMode = useSelector((state) => state.themeReducer.darkMode);
  return (
    <Link to={`/Users/${user._id}`} className={`user-profile-link ${darkMode ? "user-profile-link-dark" : ""}`}>
    <h3>{user.name.charAt(0).toUpperCase()}</h3>
    <h5>{user.name}</h5>
    </Link>
  )
}

export default User
