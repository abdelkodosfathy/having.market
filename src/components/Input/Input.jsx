import React from 'react'
import './Input.css'
const Input = ({id, type, name,  children, placeholder}) => {
  return (
    <div className='input-field'>
        <label htmlFor={id} className="form-label">{children}</label>
        <input type={type}
        className="form-field" 
        // placeholder={placeholder === undefined ? children : placeholder } 
        name={name} 
        id={id} 
        required />
    </div>
  )
}

export default Input