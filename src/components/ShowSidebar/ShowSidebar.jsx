import React from 'react'
import './ShowSidebar.css'

const ShowSidebar = () => {
  function showFilters(){

    // const sidebar = document.querySelector(".side-bar");
    // console.log(sidebar);
    // // sidebar.style.left = 0;
    // sidebar.classList.add("hideable");
    
    // const cardViewer= document.querySelector(".card-viewer");
    // cardViewer.style.pointerEvents = "none";
    // cardViewer.classList.add("blured");
  }
  return (
    <div className='show-sidebar' key="sidebar-btn">
        <button onClick={showFilters}>Show Filters</button>
    </div>
  )
}

export default ShowSidebar