import React, { forwardRef, useContext, useRef } from 'react';
import axios from 'axios'; // Make sure axios is imported
import './DeleteModal.css'; // Import your CSS file for styling
import { FunctionsContext } from '../../components/Context';


const DeleteModal = forwardRef(({ handleCloseModal, token }, ref) => {
  const tokenChanger = useContext(FunctionsContext).changeToken;
  const dialog = useRef();
  const passwordRef = useRef();
  function handleClose() {
    handleCloseModal();
  }

  function handleDeleteAccount(e) {
    e.preventDefault(); // Prevent default form submission behavior
    console.log(token);
    axios.delete('https://app.having.market/api/profile/delete', {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      data: {
        'current_password': passwordRef.current.value // Assuming your API expects a 'password' field in the body
      }
    }).then(response => {
      console.log('Account deleted successfully', response);
      // if(response.status === 200){
        tokenChanger(null, false)
        console.log("deleted: ",response);
      // }
    }).catch(error => {
      console.error('Error deleting account', error);
      // Handle error or display message to user
    });
  }

  function handleLogout(){
    const token = x.loginState.token;
    console.log("log out: ", token);
    axios("https://app.having.market/api/logout", {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      method: "post",
    }).then(e => {
      if(e.status === 200){
        tokenChanger(null, false)
        console.log("loged out: ",e);
      }

    })
  }
  return (
    <dialog className="delete-modal" ref={dialog}>
      <h1>Are you sure you want to delete your account?</h1>
      <form onSubmit={handleDeleteAccount}>
        <input type="password" ref={passwordRef} name="current-password" placeholder="Enter your password" />
        <button type='submit' className='delete'>Delete Account</button>
      </form>
      <button onClick={handleClose}>Cancel deletion</button>
    </dialog>
  );
});

export default DeleteModal;
