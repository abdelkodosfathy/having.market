import React from 'react'
import './MyRegister.css'
import axios from 'axios';
import Input from '../Input/Input';
const myRegister = () => {

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      password: formData.get('password'),
      password_confirmation: formData.get('confirm_password')
    };
    axios.post("https://rockteer.badracademyedu.com/api/register", data)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }
  return (
    <form className='register' onSubmit={handleSubmit}>
      <h1>Register</h1>
        <Input id="register-name" type="text" name="name" placeholder="show to other">Name</Input>
      <div className="row">
        <Input id="register-email" type="email" name="email">email</Input>
        <Input id="phone" type="tel" name="phone">phone</Input>
      </div>
      <div className="row">
        <Input id="register-password" type="password" name="password">Password</Input>
        <Input id="confirm-password" type="password" name="confirm_password">Confirm Password</Input>
      </div>
      <button className='register-btn' onClick={handleSubmit}>Register</button>
    </form>
  )
}

export default myRegister