import React from 'react'
import { useNavigate } from 'react-router-dom'
import Expand from '../components/Expand/Expand';


const NotFound = () => {
  let navigate = useNavigate();
  return (
    <div className='not-found'>
      <h1>wrong link...</h1>
      <button onClick={() => navigate("/")}>
        Go To Home?        
      </button>
      {/* <Expand title={"نوع العقار"} content={"عقار"}/> */}
    </div>
  )
}

export default NotFound