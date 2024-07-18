// import React, { useContext, useRef, useState } from 'react'
// import ReactSlider from "react-slider";
// import './SideBar.css';
// import Combobox from '../Combobox/Combobox';
// import Button from './Button';
// import { DataContext } from '../Context';

// const RangeSelector = () => {
//   const [value, setValue] = useState(0);

//   const options = ['All', '1', '2', '3', 'More'];

//   const handleChange = (event) => {
//       setValue(event.target.value);
//   };

//   return (
//       <div className="range-container">
//         <ul className="range-labels">
//             {options.map((option, index) => (
//               <li key={index} className={`label ${index == value ? 'active' : ''}`}>
//                     {option}
//               </li>
//             ))}
//         </ul>
//         <div className="input-range">

//         <input
//             type="range"
//             min="0"
//             max="4"
//             value={value}
//             step="1"
//             onChange={handleChange}
//             className="range-input"
//             />
//         </div>
//       <div className="side-bar-roomRange">
//       </div>
//       </div>
//   );
// };

// const SideBar = ({state,onClose, onFilterChange, maxPrice = 1000, minPrice = 0, media="big"}) => {

//   const comboRef = useRef(null);
//   const minRef = useRef(null);
//   const maxRef = useRef(null);

//   const darkMode = useContext(DataContext).darkMode;
//   const [property,setProperty] = useState(null);
//   const [rooms,setRooms] = useState(null);

//   function propertyType(prop){
//     if(property !== prop){
//       setProperty(prop);
//     }else if(prop === property){
//       setProperty(null);
//     }
//   }

//   function handlePriceChange(value, index){
//     // console.log(`onChange: ${JSON.stringify({ value, index })}`);
//     const priceData = {
//       value,
//       index
//     }
//     minRef.current.innerText = priceData.value[0];
//     maxRef.current.innerText = priceData.value[1];
//   }
//   function handleFilters(
//     city = null,
//     type = null,
//     bedrooms = null,
//     bathrooms = null,
//     minPrice = null,
//     maxPrice = null
//   ){
//     if(city !== null){
//       if(!(city.trim() === "")){
//         city = city.toLowerCase();
//       }
//     }

//     if(bedrooms === "4+"){
//       bedrooms = 4;
//     }
//   const filters = {
//     city: city,
//     type: type,
//     bedrooms: bedrooms,
//     bathrooms: bathrooms,
//     minPrice: minPrice,
//     maxPrice: maxPrice
//   };

//     console.log(filters);
//     onFilterChange(filters)
//   }
//   return (
//     <div  className={`bluering ${state && "show"}`}>
//     <div className={`side-bar ${darkMode? 'dark' : ''} ${media}`}>
//       <button className='sidebard-close' onClick={onClose}>x</button>
//       <div className="head">
//         {
//           media === "big" && <h1>Filters</h1>
//         }
//         {/* <p>Reset</p> */}
//       </div>
//       <div className="property-type">
//         {
//           media === "big" && <h3>Proprety type</h3>
//         }
//         <div className="property-type-btns">
//           {/* <Button onClicked={() => propertyType("house")} proprety="house" isActivated={property}> */}
//           <Button onClicked={propertyType} proprety="house" isActivated={property}>
//             <i className="fa-solid fa-house"></i>
//           </Button>
//           {/* <Button onClicked={() => propertyType("appartment")} proprety="appartment" isActivated={property}> */}
//           <Button onClicked={propertyType} proprety="appartment" isActivated={property}>
//             <i className="fa-solid fa-building"></i>
//           </Button>
//           {/* <Button onClicked={() => propertyType("villa")} proprety="villa" isActivated={property}> */}
//           <Button onClicked={propertyType} proprety="villa" isActivated={property}>
//             <i className="fa-solid fa-briefcase"></i>
//           </Button>
//           {/* <Button onClicked={() => propertyType("land plat")} proprety="land plat" isActivated={property}> */}
//           <Button onClicked={propertyType} proprety="land plat" isActivated={property}>
//             <i className="fa-solid fa-calendar-week"></i>
//           </Button>
//         </div>
//       </div>
//       <div className="location">
//         <h3>Location</h3>
//         <Combobox ref={comboRef}/>
//       </div>
//       <div className="Price-range">
//         <h3>Price Range</h3>
//         <div className="priceSlider">
//           <div className="price-box">
//               <div className="price">
//                 <p>min</p>
//                 <p ref={minRef}>{minPrice}</p>
//                 </div>
//               <div className="price">
//                 <p>max</p>
//                 <p ref={maxRef}>{maxPrice}</p>
//                 </div>
//             </div>
//           <ReactSlider
//             key={"aa"}
//             className="horizontal-slider"
//             thumbClassName="example-thumb"
//             trackClassName="example-track"
//             defaultValue={[minPrice, maxPrice]}
//             // value={5}
//             ariaLabel={['Lower thumb', 'Upper thumb']}
//             ariaValuetext={state => `Thumb value ${state.valueNow}`}
//             renderThumb={({key, ...props}) => <div key={key} {...props}></div>}
//             pearling
//             minDistance={5}
//             onChange={(value, index) => handlePriceChange(value, index)}/>
//         </div>
//       </div>
//       <RangeSelector/>

//       {/*the comment*/}
//       <div className="apply-filters">
//       <button onClick={() =>{
//           handleFilters(null, null, null, null, null, null)
//           onClose();
//         }}>
//           Reset
//         </button>
//         <button onClick={() =>{
//           console.log(comboRef.current.value);
//           handleFilters(comboRef.current.value, property, rooms, null, null, null)
//           onClose();
//         }}>
//           Apply
//         </button>

//       </div>
//     </div>
//     </div>
//   )
// }

// export default SideBar

import React, { Children, useContext, useRef, useState } from "react";
import ReactSlider from "react-slider";
import "./SideBar.css";
import Button from "./Button";
import Expand from "../Expand/Expand";
import Combobox from "../Combobox/Combobox";
import { DataContext } from "../Context";
import AdditionalFeatures from "./AdditionalFeatures";
import axios from "axios";

// const RangeSelector = ({ onChange, value, title }) => {
//   const options = ['All', '1', '2', '3', 'More'];

//   const handleChange = (event) => {
//     onChange(event.target.value);
//   };

//   return (
//     <div className="range-container">
//       <h3>{title}</h3>
//       <ul className="range-labels">
//         {options.map((option, index) => (
//           <li key={index} className={`label ${index == value ? 'active' : ''}`}>
//             {option}
//           </li>
//         ))}
//       </ul>
//       <div className="input-range">
//         <input
//           type="range"
//           min="0"
//           max="4"
//           value={value}
//           step="1"
//           onChange={handleChange}
//           className="range-input"
//         />
//       </div>
//       <div className="side-bar-roomRange">
//       </div>
//     </div>
//   );
// };

// const RangeSelector = ({ onChange, value = 0, title }) => {
//   const options = ['الكل', '1', '2', '3', 'اكثر'];

//   const handleChange = (event) => {
//     onChange(event.target.value);
//   };

//   return (
//     <div className="range-container">
//       <h3>{title}</h3>
//       <ul className="range-labels">
//         {options.map((option, index) => (
//           <li key={index} className={`label ${index == (value || 0) ? 'active' : ''}`}>
//             {option}
//           </li>
//         ))}
//       </ul>
//       <div className="input-range">
//         <input
//           type="range"
//           min={0}
//           max={4}
//           value={value || 0}
//           step="1"
//           onChange={handleChange}
//           className="range-input"
//         />
//       </div>
//       <div className="side-bar-roomRange">
//       </div>
//     </div>
//   );
// };
const Radio = ({ name, onClicked, title }) => {
  const inputRef = useRef(null);

  const handleClick = () => {
    onClicked(inputRef.current.checked);
  };

  const radioStyle = {
    padding: "10px",
    cursor: "pointer",
    boxShadow: "0px 1px 3px  rgba(0, 0, 0, 0.5)",
  };

  return (
    <label
      onClick={handleClick}
      style={radioStyle}
      className={`sidebar-radio ${inputRef.current?.checked ? "checked" : ""}`}
    >
      {title}
      <input type="radio" name={name} className="" ref={inputRef} />
    </label>
  );
};

const CheckBox = ({ children, title, boxClassName }) => {
  const checkboxStyle = {
    checkBox: {
      display: "none",
    },
    label: {
      display: "inline-block",
      padding: "8px 16px",
      /* background-color: ; */
      /* color: #fff; */
      border: "none",
      cursor: "pointer",
      boxShadow: "0px 1px 3px  rgba(0,0,0,0.5)",
      WebkitBoxShadow: "0px 1px 3px  rgba(0,0,0,0.5)",
    },
  };

  const [checked, setChecked] = useState(false);
  function handleChecked() {
    setChecked((prev) => !prev);
    console.log(checked);
  }
  return (
    <label
      style={checkboxStyle.label}
      className={`${boxClassName ? boxClassName : ""} sidebar-checkbox ${
        checked ? "checked" : ""
      }`}
    >
      <p>{title}</p>
      <input
        style={checkboxStyle.checkBox}
        type="checkbox"
        onClick={handleChecked}
        value={""}
      />
    </label>
  );
};
const NumberInput = ({ title }) => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => {
    if (count > 0) setCount(count - 1);
  };
  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 0) {
      setCount(value);
    }
  };

  return (
    <div className="sidebar-number-input">
      <h3>{title}</h3>
      <div className="sidebar-number-input-controls">
        <button onClick={decrement}>-</button>
        <input type="number" value={count} onChange={handleChange} min="0" />
        <button onClick={increment}>+</button>
      </div>
    </div>
  );
};
const Slider = ({ title, onSetValue }) => {
  const [values, setValues] = useState([0, 1000]);

  const handleSliderChange = (newValues) => {
    setValues(newValues);
    onSetValue(newValues);
  };
  return (
    <div className="sidebar-Slider">
      <h3>{title}</h3>
      <ReactSlider
        className="horizontal-slider"
        thumbClassName="example-thumb"
        trackClassName="example-track"
        defaultValue={[0, 1000]}
        ariaLabel={["Lower thumb", "Upper thumb"]}
        pearling
        minDistance={1}
        min={0}
        max={1000}
        onAfterChange={handleSliderChange}
        value={values}
        invert
      />
      <div className="slider-values">
        <span>إلى: {values[1]}</span>
        <span>من: {values[0]}</span>
      </div>
    </div>
  );
};
const renderTitle = (property) => {
  switch (property) {
    case "land":
    case "commercial":
    case "industrial":
      return <h3>النشاط</h3>;
    case "housing":
    case "coastal":
      return <h3>التصنيف</h3>;
    default:
      return null;
  }
};

const SideBar = ({
  state,
  onClose,
  onFilterChange,
  max = 99999999,
  min = 0,
  media = "big",
}) => {
  // const comboRef = useRef(null);
  // const minRef = useRef(null);
  // const maxRef = useRef(null);

  // const darkMode = useContext(DataContext).darkMode;
  // const [property, setProperty] = useState("");
  // const [finishingType, setFinishingType] = useState(null);
  // const [rooms, setRooms] = useState(null);
  // const [bathrooms, setBathrooms] = useState(null);
  // const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);
  // const [featuresArray, setFeaturesArray] = useState([]);
  // const [action, setAction] = useState(null);

  // function propertyType(prop) {
  //   setProperty(prev => prev === prop ? null : prop);
  // }

  // function handlePriceChange(value) {
  //   setPriceRange(value);
  //   minRef.current.innerText = value[0];
  //   maxRef.current.innerText = value[1];
  // }

  // function handleFilters() {
  //   console.log(property === "");
  //   const city = comboRef.current.value;
  //   const filters = {
  //     city: city ? city.toLowerCase() : null,
  //     type: property,
  //     finishing_type: finishingType,
  //     bedrooms: rooms !== 0 ? rooms : null,
  //     bathrooms: bathrooms !== 0 ? bathrooms : null,
  //     minPrice: priceRange[0],
  //     maxPrice: priceRange[1],
  //     featuresArray: featuresArray,
  //     action: action
  //   };

  //   function handleChange(event){
  //     console.log(event.target.value);
  //   }
  //   console.log(filters);
  //   onFilterChange(filters);
  //   onClose();
  // }

  // function selectFeature(state, feature){
  //   if(state.checked){
  //     console.log("checked: ", feature);
  //     setFeaturesArray(prevArray => [...prevArray, feature]);
  //   } else {
  //     console.log("remove: ", feature);
  //     setFeaturesArray(prevArray => prevArray.filter(feature => feature !== state.value));
  //   }
  // }

  //new sidebar edits

  //

  // states and vars
  const [expanded, setExpanded] = useState(null);
  const [activeProp, setActiveProp] = useState(null);
  const [activeType, setActiveType] = useState(null);
  const [space, setSpace] = useState(null);
  const [price, setPrice] = useState(null);
  const [payment, setPayment] = useState(null);

  // const Activities = [
  //   {
  //     type:"housing",
  //     Activities:[
  //       "فيلا",
  //       "بينتا هاوس",
  //       "شقة",
  //       "روف",
  //     ]
  //   },
  //   {
  //     type:"commercial",
  //     Activities:[
  //       "تجاري",
  //       "تجاري1",
  //       "تجاري2",
  //       "تجاري3",
  //     ]
  //   },
  //   {
  //     type:"industrial",
  //     Activities:[
  //       "صناعي",
  //       "صناعي1",
  //       "صناعي2",
  //       "صناعي3",

  //     ]
  //   },
  //   {
  //     type:"coastal",
  //     Activities:[
  //       "ساحلي",
  //       "1ساحلي",
  //       "2ساحلي",
  //       "3ساحلي",

  //     ]
  //   },
  //   {
  //     type:"land",
  //     Activities:[
  //       "ارض",
  //       "1ارض",
  //       "2ارض",
  //       "3ارض",

  //     ]
  //   },
  // ]
  const Activities = [
    {
      type: "commercial",
      activities: [
        { en: "super market", ar: "سوبر ماركت" },
        { en: "pharmacy", ar: "صيدلية" },
        { en: "bakery", ar: "مخبز" },
        { en: "vegetables", ar: "خضروات" },
        { en: "another", ar: "آخر" },
      ],
    },
    {
      type: "industrial",
      activities: [
        { en: "Building materials", ar: "مواد البناء" },
        { en: "Auto industry (cars)", ar: "صناعة السيارات" },
        { en: "Tobacco", ar: "التبغ" },
        { en: "Leather", ar: "الجلود" },
        { en: "Electronic industries", ar: "الصناعات الإلكترونية" },
        { en: "electrical", ar: "الكهربائية" },
        { en: "Chemical", ar: "الكيميائية" },
        { en: "Pharmaceutical", ar: "الصيدلانية" },
        { en: "Mechanical", ar: "الميكانيكية" },
        { en: "Delivery services", ar: "خدمات التوصيل" },
        { en: "Another activity", ar: "نشاط آخر" },
        { en: "without", ar: "بدون" },
      ],
    },
    {
      type: "land",
      activities: [
        { en: "residential", ar: "سكني" },
        { en: "commercial", ar: "تجاري" },
        { en: "Administrative", ar: "إداري" },
        { en: "Entertaining", ar: "ترفيهي" },
        { en: "industrial", ar: "صناعي" },
        { en: "agricultural", ar: "زراعي" },
        { en: "Store", ar: "مخزن" },
        { en: "medical", ar: "طبي" },
        { en: "Usufruct right", ar: "حق الانتفاع" },
        { en: "coastal", ar: "ساحلي" },
      ],
    },
    {
      type: "housing",
      activities: [
        { en: "Apartment", ar: "شقة" },
        { en: "Loft", ar: "لوفت" },
        { en: "Penthouse", ar: "بنتهاوس" },
        { en: "Villa", ar: "فيلا" },
        { en: "Town House", ar: "تاون هاوس" },
        { en: "Duplex", ar: "دوبلكس" },
        { en: "Twin Vill", ar: "فيلا ثؤام" },
        { en: "Roof", ar: "روف" },
      ],
    },
    {
      type: "coastal",
      activities: [
        { en: "Chalet", ar: "شاليه" },
        { en: "Apartment", ar: "شقة" },
        { en: "Loft", ar: "لوفت" },
        { en: "Penthouse", ar: "بنتهاوس" },
        { en: "Villa", ar: "فيلا" },
        { en: "Town House", ar: "تاون هاوس" },
        { en: "Duplex", ar: "دوبلكس" },
        { en: "Twin Vill", ar: "فيلا ثؤام" },
        { en: "Roof", ar: "روف" },
      ],
    },
  ];

  // functions
  function handleExpand(e) {
    setExpanded(e);
  }

  //set Filters Property
  function handleSettingProperty(prop) {
    setActiveProp(prop);
    console.log("prop: ", prop);
  }
  function handleSettingType(prop) {
    setActiveType(prop);
    console.log("Type: ", prop);
  }
  function handleSettingFinishing(prop) {
    setActiveType(prop);
    console.log("finish: ", prop);
  }

  function handleSpace(value) {
    // console.log(value);
    setSpace(value);
  }

  function handlePrice(value) {
    // console.log(value, "price: ", price);
    setPrice(value);
  }
  function handleSettingPayment(prop) {
    setActiveType(prop);
    console.log("finish: ", prop);
  }

  function handleApplyFilters() {
    console.log("filter: ");
  }

  // const getPlacesInCity = async (city, country) => {
  //   try {
  //     const username = 'abdo'; // استبدال 'YOUR_USERNAME' بمفتاح API الخاص بك
  //     const url = `http://api.geonames.org/searchJSON?username=${username}&q=${city}&country=${country}&maxRows=1000&lang=ar`;

  //     const response = await axios.get(url);
  //     const places = response.data.geonames.map(place => {
  //       if(place.name === "الأميرية" || place.name === "جبل المقطم" ){
  //         console.log(place.name, place);
  //       }

  //       return ({
  //         name: place.name,
  //         // latitude: place.lat,
  //         // longitude: place.lng
  //         });
  //       }
  //     );

  //     return places;
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //     return [];
  //   }
  // };

  // // استخدام الدالة
  // const city = 'Cairo'; // اسم المدينة
  // const country = 'EG'; // كود الدولة
  // getPlacesInCity(city, country)
  //   .then(places => {
  //     console.log('Places in', city + ',', country + ':', places);
  //   })
  //   .catch(error => console.error('Error:', error));

  console.log("Active: ", activeProp);

  return (
    <div className={`bluering ${state && "show"}`}>
      {/* <div className={`side-bar ${darkMode ? 'dark' : ''} ${media}`}> */}

      <div className={`side-bar`}>
        <button className="sidebard-close" onClick={onClose}>
          x
        </button>

        <Expand
          id={1}
          title={"نوع العقار"}
          onExpand={handleExpand}
          expandId={expanded}
        >
          <Button
            onClicked={handleSettingProperty}
            active={activeProp}
            property={"commercial"}
            title={"تجاري"}
          >
            <i className="fa-solid fa-handshake"></i>
          </Button>
          <Button
            onClicked={handleSettingProperty}
            active={activeProp}
            property={"housing"}
            title={"سكني"}
          >
            <i className="fa-solid fa-building"></i>
          </Button>
          <Button
            onClicked={handleSettingProperty}
            active={activeProp}
            property={"industrial"}
            title={"صناعي"}
          >
            <i className="fa-solid fa-industry"></i>
          </Button>
          <Button
            onClicked={handleSettingProperty}
            active={activeProp}
            property={"coastal"}
            title={"ساحلي"}
          >
            <i className="fa-solid fa-house-flood-water"></i>
          </Button>
          <Button
            onClicked={handleSettingProperty}
            active={activeProp}
            property={"land"}
            title={"ارض"}
          >
            <i className="fa-solid fa-map"></i>
          </Button>

          <div className="category">
            {renderTitle(activeProp)}
            <div className="prop-activity">
              {Activities.map((activity) => {
                const name = activity.type;
                if (activity.type === activeProp) {
                  return activity.activities.map((e) => (
                    <Radio
                      key={e.en}
                      name={name}
                      onClicked={handleSettingType}
                      active={activeType}
                      title={e.ar}
                    />
                  ));
                } else {
                  return null;
                }
              })}
            </div>
          </div>
        </Expand>
        {activeProp !== "land" && (
          <Expand
            id={2}
            title={"نوع التشطيب"}
            onExpand={handleExpand}
            expandId={expanded}
          >
            <Radio
              title={"نصف"}
              name={"finishing"}
              onClicked={handleSettingFinishing}
            />
            <Radio
              title={"كامل"}
              name={"finishing"}
              onClicked={handleSettingFinishing}
            />
            <Radio
              title={"سوبر لوكس"}
              name={"finishing"}
              onClicked={handleSettingFinishing}
            />
            <Radio
              title={"شامل الفرش"}
              name={"finishing"}
              onClicked={handleSettingFinishing}
            />
          </Expand>
        )}
        <Expand
          id={3}
          title={"مواصفات فنية"}
          onExpand={handleExpand}
          expandId={expanded}
        >
          <Slider title={"المساحة"} onSetValue={(e) => handleSpace(e)} />
          <NumberInput title={"الغرف"} />
          <NumberInput title={"الحمامات"} />
        </Expand>
        <Expand
          id={4}
          title={"مواصفات المالية"}
          onExpand={handleExpand}
          expandId={expanded}
        >
          {/* <Slider title={"السعر"} onMaxChange={handleMaxPrice} onMinChange={handleMinPrice}/> */}
          <Slider title={"السعر"} onSetValue={(e) => handlePrice(e)} />
          <div className="payment-row">
            <Radio
              title={"كاش"}
              name={"payment"}
              onClicked={handleSettingPayment}
            />
            <Radio
              title={"تقسيط"}
              name={"payment"}
              onClicked={handleSettingPayment}
            />
          </div>
        </Expand>
        <Expand
          id={5}
          title={"الموقع"}
          onExpand={handleExpand}
          expandId={expanded}
        ></Expand>
        <Expand
          id={6}
          title={"ميزات اضافية"}
          onExpand={handleExpand}
          expandId={expanded}
        ></Expand>

        <div className="apply-filters">
          {/* <button onClick={handleFilters}> */}
          <button onClick={handleApplyFilters}>تطبيق</button>
          <button
            onClick={() => {
              // setProperty(null);
              // setFinishingType(null);
              // setRooms(null);
              // setBathrooms(null);
              // setPriceRange([minPrice, maxPrice]);
              // setAction(null);
              // setFeaturesArray([]);
              // comboRef.current.value = "";
              // onFilterChange({});
              // onClose();
            }}
          >
            اعادة ضبط
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
