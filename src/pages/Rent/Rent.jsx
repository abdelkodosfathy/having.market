import React, { useEffect, useState } from "react";
import "../Buy/Buy.css";
// import SideBar from '../../components/SideBar/SideBar'
import NewSidebar from "../../components/SideBar/NewSidebar";
import CardsViewer from "../../components/CardsViewer/CardsViewer";
const Rent = ({ searchFilter }) => {
  const [sidebarState, setSidebarState] = useState(false);
  const [priceRange, setPriceRange] = useState([null, null]);
  const [filterData, setFilterData] = useState({
    city: null,
    bedrooms: null,
    rooms: null,
    minPrice: null,
    maxPrice: null,
    features: [],
    finishing: null,
    gover: "",
    payment: null,
    space: [null, null],
    type: null,
  });

  useEffect(() => {
    if (searchFilter !== null) {
      // Assuming searchFilter has properties like value, label, and gover
      const { value, label, gover } = searchFilter;
      setFilterData({
        ...filterData,
        city: value,
        gover: gover.toString(), // Convert to string if needed
      });
    }
  }, [searchFilter]);
  // Function to handle data changes from the SideBar
  const handleFilterChange = (newData) => {
    if (typeof newData === "object") {
      console.log(newData);
      setFilterData(newData); // Update filterData state with the newData object
    } else {
      console.log("Received non-object data:", newData);
    }
  };

  function handleSidebar() {
    setSidebarState((prev) => !prev);
  }

  function handlePriceRange(e) {
    setPriceRange(e);
  }
  return (
    <div className="buy">
      <NewSidebar
        state={sidebarState}
        onClose={handleSidebar}
        onFilterChange={handleFilterChange}
        priceRange={priceRange}
      />
      {/* <button onClick={handleSidebar}>Show Filters</button> */}
      <CardsViewer
        onSidebarStateClicked={handleSidebar}
        action={"rent"}
        filter={filterData}
        priceRange={handlePriceRange}
      />
    </div>
  );
};

export default Rent;
// import React, { useState } from 'react'
// import './Rent.css'
// // import SideBar from '../../components/SideBar/SideBar'
// import NewSidebar from '../../components/SideBar/NewSidebar'
// import CardsViewer from '../../components/CardsViewer/CardsViewer'
// const Rent = () => {
//   const [sidebarState, setSidebarState] = useState(false);
//   const [filterData, setFilterData] = useState({
//   city: null,
//   type: null,
//   bedrooms: null,
//   bathrooms: null,
//   minPrice: null,
//   maxPrice: null
//   });

//   // Function to handle data changes from the SideBar
//   const handleFilterChange = (newData) => {
//     setFilterData(newData);
//   };

//   function handleSidebar() {
//     setSidebarState(prev => !prev);
//   }
// return (
//   <div className='buy'>
//   <NewSidebar state={sidebarState} onClose={handleSidebar} onFilterChange={handleFilterChange}/>
//   <CardsViewer onSidebarStateClicked={handleSidebar} action={"rent"} filterData={filterData}/>
//   </div>
// )
// }

// export default Rent
