import React from 'react'

const toogglerPassword = ({ onClick, show }) => {
   return (
      <span onClick={onClick} role='button'>
         <i className={`fas ${show ? 'fa-eye-slash' : 'fa-eye'}`}></i>
      </span>

   )
}

export default toogglerPassword
