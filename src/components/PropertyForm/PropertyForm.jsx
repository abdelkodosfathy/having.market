import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { DataContext } from "../Context";
import { useContext } from "react";
// import './Style.css';
import "./PropertyForm.css";
import InputMap from "../InputMap/InputMap";
import LoadingCircle from "../LoadingCircle/LoadingCircle";
import Select from "react-select";
import ImageSlider from "./ImageSlider/ImageSlider";

// const data

//new components
const Location = ({ handleChange, city = null, gover = null }) => {
  const [governorates, setGovernorates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedGovernorate, setSelectedGovernorate] = useState(gover);
  const [selectedCity, setSelectedCity] = useState(city);

  const fetchGovernorates = async () => {
    try {
      const response = await axios.get("https://app.having.market/api/gover");
      if (response.data && Array.isArray(response.data.data)) {
        setGovernorates(response.data.data);
      } else {
        console.error("Unexpected response format:", response);
      }
    } catch (error) {
      console.error("Error fetching governorates:", error);
    }
  };

  const fetchCities = (governorateId) => {
    const selectedGovernorate = governorates.find(
      (gov) => gov.id === governorateId,
    );
    if (selectedGovernorate && Array.isArray(selectedGovernorate.city)) {
      setCities(selectedGovernorate.city);
    } else {
      setCities([]);
    }
  };

  const handleGovernorateChange = (selectedOption) => {
    setSelectedGovernorate(selectedOption);
    setSelectedCity(null); // Reset city when governorate changes
    fetchCities(selectedOption ? selectedOption.value : null);
    handleChange(
      { name: "gover", value: selectedOption ? selectedOption.value : "" },
      true,
    );

    handleChange({ name: "city", value: null }, true); // Ensure city prop is null or empty
  };

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption);
    handleChange(
      { name: "city", value: selectedOption ? selectedOption.value : "" },
      true,
    );
  };

  useEffect(() => {
    fetchGovernorates();
  }, []);

  const governorateOptions = governorates.map((governorate) => ({
    value: governorate.id,
    label: governorate.name,
  }));

  const cityOptions = cities.map((city) => ({
    value: city.id,
    label: city.name,
  }));

  const customStyles = {
    control: (provided) => ({
      ...provided,
      minHeight: "40px",
      borderRadius: "4px",
      borderColor: "#ced4da",
      boxShadow: "none",
      cursor: "pointer",
      "&:hover": {
        borderColor: "#a8b3c4",
      },
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "4px",
      zIndex: 1001,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#007bff" : "#fff",
      color: state.isSelected ? "#fff" : "#000",
      "&:hover": {
        backgroundColor: "#f8f9fa",
        color: "#000",
      },
    }),
  };

  return (
    <div>
      <label>
        المحافظة:
        <Select
          name="gover"
          options={governorateOptions}
          onChange={handleGovernorateChange}
          value={selectedGovernorate}
          placeholder="اختر محافظة"
          isClearable
          styles={customStyles}
        />
      </label>
      <label>
        المدينة:
        <Select
          name="city"
          options={cityOptions}
          onChange={handleCityChange}
          value={selectedCity}
          placeholder="اختر مدينة"
          isClearable
          styles={customStyles}
          isDisabled={!selectedGovernorate}
        />
      </label>
    </div>
  );
};

const MySelect = ({ title, formName, options, children }) => {
  return (
    <label>
      <h3>{title}</h3>
      <select name={formName} id={formName}>
        {options.map((e, i) => {
          return (
            <option key={i} value={e}>
              {e}
            </option>
          );
        })}
      </select>
    </label>
  );
};
const NumberInput = ({ title }) => {
  const [count, setCount] = useState(0);

  const increment = (e) => {
    e.preventDefault();
    setCount(count + 1);
  };
  const decrement = (e) => {
    e.preventDefault();
    if (count > 0) setCount(count - 1);
  };
  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 0) {
      setCount(value);
    }
  };

  return (
    <div className="property-number-input  ">
      <h3>{title}</h3>
      <div className="property-number-input-controls ">
        <button onClick={decrement}>-</button>
        <input
          className="numbers"
          type="number"
          value={count}
          onChange={handleChange}
          min="0"
        />
        <button onClick={increment}>+</button>
      </div>
    </div>
  );
};

const Activities = [
  {
    type: {
      en: "commercial",
      ar: "تجاري",
    },
    activities: [
      { en: "super market", ar: "سوبر ماركت" },
      { en: "pharmacy", ar: "صيدلية" },
      { en: "bakery", ar: "مخبز" },
      { en: "vegetables", ar: "خضروات" },
      { en: "another", ar: "آخر" },
    ],
  },
  {
    type: {
      en: "industrial",
      ar: "صناعي",
    },
    activities: [
      { en: "building materials", ar: "مواد البناء" },
      { en: "auto industry (cars)", ar: "صناعة السيارات" },
      { en: "tobacco", ar: "التبغ" },
      { en: "leather", ar: "الجلود" },
      { en: "electronic industries", ar: "الصناعات الإلكترونية" },
      { en: "electrical", ar: "الكهربائية" },
      { en: "chemical", ar: "الكيميائية" },
      { en: "pharmaceutical", ar: "الصيدلانية" },
      { en: "mechanical", ar: "الميكانيكية" },
      { en: "delivery services", ar: "خدمات التوصيل" },
      { en: "another activity", ar: "نشاط آخر" },
      { en: "without", ar: "بدون" },
    ],
  },
  {
    type: { en: "land", ar: "ارض" },
    activities: [
      { en: "residential", ar: "سكني" },
      { en: "commercial", ar: "تجاري" },
      { en: "administrative", ar: "إداري" },
      { en: "entertaining", ar: "ترفيهي" },
      { en: "industrial", ar: "صناعي" },
      { en: "agricultural", ar: "زراعي" },
      { en: "store", ar: "مخزن" },
      { en: "medical", ar: "طبي" },
      { en: "usufruct right", ar: "حق الانتفاع" },
      { en: "coastal", ar: "ساحلي" },
    ],
  },
  {
    type: { en: "housing", ar: "سكني" },
    activities: [
      { en: "apartment", ar: "شقة" },
      { en: "loft", ar: "لوفت" },
      { en: "penthouse", ar: "بنتهاوس" },
      { en: "villa", ar: "فيلا" },
      { en: "town House", ar: "تاون هاوس" },
      { en: "duplex", ar: "دوبلكس" },
      { en: "twin Vill", ar: "فيلا ثؤام" },
      { en: "roof", ar: "روف" },
      { en: "studio", ar: "ستوديو" },
    ],
  },
  {
    type: { en: "coastal", ar: "ساحلي" },
    activities: [
      { en: "chalet", ar: "شاليه" },
      { en: "apartment", ar: "شقة" },
      { en: "loft", ar: "لوفت" },
      { en: "penthouse", ar: "بنتهاوس" },
      { en: "villa", ar: "فيلا" },
      { en: "town House", ar: "تاون هاوس" },
      { en: "duplex", ar: "دوبلكس" },
      { en: "twin Vill", ar: "فيلا ثؤام" },
      { en: "roof", ar: "روف" },
    ],
  },
];

// const Tab1 = ({ formData, handleChange, isUpdate, locationRef }) => {
//   // console.log("tap1: ", formData);
//   return (
//     <div className='tab-1'>
//       <label>
//         العنوان:
//         <input
//           required
//           type="text"
//           name="address"
//           defaultValue={isUpdate ? isUpdate.address : formData.address}
//           onChange={handleChange}
//           disabled={isUpdate} // Disable input if isUpdate is provided
//         />
//       </label>
//       <label>
//         الموقع:
//         <input
//           required
//           type="text"
//           name="location"
//           placeholder='You can use the map to choose the location'
//           defaultValue={isUpdate ? isUpdate.location : formData.location}
//           ref={locationRef}
//           onChange={handleChange}
//           disabled={isUpdate} // Disable input if isUpdate is provided
//         />
//       </label>
//       <label>
//         {/* City: */}
//         المدينة:
//         <select
//           required
//           name="city"
//           defaultValue={isUpdate ? isUpdate.city : formData.city}
//           onChange={handleChange}
//           disabled={isUpdate} // Disable input if isUpdate is provided
//         >
//           <option value="Cairo">Cairo</option>
//           <option value="Alexandria">Alexandria</option>
//           <option value="Giza">Giza</option>
//           <option value="Luxor">Luxor</option>
//           <option value="Aswan">Aswan</option>
//         </select>
//       </label>
//     </div>
//   );
// };
// const Tab2 = ({ formData, handleChange, isUpdate }) => {
//   const bedRef = useRef(0);
//   const bathRef = useRef(0);
//   const typeRef = useRef(null)
//   const [showHouseFloors, setShowHouseFloors] = useState(false);
//   const [showFinishingType, setShowFinishingType] = useState(true);
//   const [showActivityType, setShowActivityType] = useState(false);

//   function handleChoosingHouse() {
//     // display floors if selected house
//     if (typeRef && typeRef.current.value === 'house') {
//       setShowHouseFloors(true);
//     } else {
//       setShowHouseFloors(false);
//     }

//     // display finishing type if not land
//     if (typeRef && typeRef.current.value !== 'land') {
//       setShowFinishingType(true);
//     } else {
//       setShowFinishingType(false);
//     }

//     // display activity type if land, commercial, or industrial
//     // if (typeRef && (typeRef.current.value === 'land' || typeRef.current.value === 'commercial' || typeRef.current.value === 'industrial')) {
//       // setShowActivityType(true);
//       // } else {
//         //   setShowActivityType(false);
//         // }

//   }

//   return (
//     <div className='tab-2'>
//       <label>
//         {/* Type: */}
//         النوع:
//         <select
//           onChangeCapture={handleChoosingHouse}
//           ref={typeRef}
//           required
//           name="type"
//           defaultValue={isUpdate ? isUpdate.type : ""}
//           onChange={(e) => handleChange(e, setShowFinishingType, setShowActivityType)}
//           disabled={isUpdate} // Disable input if isUpdate is provided
//         >
//           {/* <option value="" disabled>select type</option>
//           <option value="villa">villa</option>
//           <option value="apartment">apartment</option>
//           <option value="house">house</option>
//           <option value="industrial">industry</option>
//           <option value="coastal">coastal</option>
//           <option value="commercial">commercial</option>
//           <option value="land">land</option> */}
//             <option value="" disabled>اختر النوع</option>

//             {/* <option value="villa">فيلا</option>
//             <option value="apartment">شقة</option>
//             <option value="house">منزل</option> */}

//             {/* <option value="housing">سكني</option> */}
//             {/* <option value="industrial">صناعي</option> */}
//             {/* <option value="coastal">ساحلي</option> */}
//             {/* <option value="commercial">تجاري</option> */}
//             {/* <option value="land">أرض</option> */}
//             {Activities.map(e => {
//               return <option value={e.type.en}>{e.type.ar}</option>
//             })}
//         </select>
//       </label>
//       {/* <label>
//         النشاط او التصنيف
//         <select
//           // onChangeCapture={handleChoosingHouse}
//           // ref={typeRef}
//           required
//           name="activity"
//           // defaultValue={isUpdate ? isUpdate.type : ""}
//           onChange={(e) => handleChange(e, setShowFinishingType, setShowActivityType)}
//           disabled={isUpdate} // Disable input if isUpdate is provided
//         >

//         </select>
//       </label> */}
//       {showHouseFloors &&
//         <label>
//           {/* Floors: */}
//           الادوار:
//           <input
//             type="number"
//             required
//             defaultValue={isUpdate ? isUpdate.size : formData.size}

//             //number of floors but this is the name in back-end
//             name="floors"
//             onChange={handleChange}
//             disabled={isUpdate} // Disable input if isUpdate is provided
//           />
//         </label>
//       }
//       {showFinishingType &&
//         <label>
//           {/* Finishing type: */}
//           نوع التشطيب:
//           <select
//             name="finishing"
//             onChange={handleChange}
//             defaultValue=""
//           >
//             {/* <option value="" disabled>select finishing</option> */}
//             <option value="" disabled>اختار نوع التشطيب</option>

//             <option value="unfinished">بدون التشطيب</option>
//             <option value="semi_finished">نصف التشطيب</option>
//             <option value="finished">كاملة التشطيب</option>
//             <option value="luxury">سوبر لوكس</option>
//             <option value="furnished">شامل الفرش</option>
//           </select>
//         </label>
//       }
//       <label>
//         {/* Activity type: */}
//         نوع النشاط
//         <select
//           name="type"
//           onChange={handleChange}
//           defaultValue=""
//         >
//           {/* <option value="" disabled >Select Finishing Type</option> */}
//           <option value="" disabled >اختار نوع النشاط</option>
//           {
//             Activities.map((activity) => {
//               if(activity.type.en === formData?.type){
//                 return (
//                   activity.activities.map((e, i) => {
//                     return <option key={i} value={e.en}>{e.ar}</option>
//                   })
//                 )
//               }
//           })}
//         </select>
//       </label>
//       <label>
//         {/* Space: */}
//         المساحة
//         <input
//           type="number"
//           required
//           defaultValue={isUpdate ? isUpdate.size : formData.size}
//           name="size"
//           onChange={handleChange}
//           disabled={isUpdate} // Disable input if isUpdate is provided
//         />
//       </label>
//       {
//         showFinishingType ? <>
//         <div className='rooms'>
//           {/* Bedrooms: */}
//           غرف النوم:
//           <input
//             ref={bedRef}
//             type="number"
//             defaultValue={isUpdate ? isUpdate.bedrooms : formData.bedrooms}
//             required
//             name="bedrooms"
//             onChange={handleChange}
//             disabled={isUpdate} // Disable input if isUpdate is provided
//           />
//         </div>
//         <div className='rooms'>
//           {/* Bathrooms: */}
//           الحمامات:
//           <input
//             ref={bathRef}
//             type="number"
//             defaultValue={isUpdate ? isUpdate.bathrooms : formData.bathrooms}
//             required
//             name="bathrooms"
//             onChange={handleChange}
//             disabled={isUpdate} // Disable input if isUpdate is provided
//           />
//         </div>
//         </>: null
//       }
//     </div>

//     // <div className="tab-2">
//     //   <Select title={"النوع"} formName={"type"} options={["سكني","ساحلي","تجاري","صناعي","ارض",]}/>
//     //   <Select title={"النشاط"} formName={"activity"} options={Activities}/>
//     //   <Select title={"التشطيب"} formName={"finishing"} options={["op","o1","o3",]}/>
//     //   <div className="rooms-row">
//     //     <NumberInput title={"الغرف"}/>
//     //     <NumberInput title={"الحمامات"}/>
//     //   </div>
//     // </div>
//   );
// };

// const Tab3 = ({ formData, handleChange, handleImageChange, isUpdate }) => {
//   console.log(formData.action);
//   return (
//   <div className='tab-3'>
//     <label>
//       {/* Description: */}
//       الوصف:
//       <textarea
//         name="description"
//         defaultValue={isUpdate ? isUpdate.description : formData.description}
//         onChange={handleChange}
//         style={{ resize: 'vertical' }}
//         // disabled={!isUpdate} // Disable input if isUpdate is provided
//       />
//     </label>
//     <label>
//       {/* Images: */}
//       الصور
//       <input type="file"
//         required
//         name="images"
//         multiple
//         onChange={handleImageChange}
//         disabled={isUpdate} // Disable input if isUpdate is provided
//       />
//     </label>
//     <label>
//       {/* Price: */}
//       السعر:
//       <input type="number"
//         required
//         defaultValue={isUpdate ? isUpdate.price : formData.price}
//         name="price"
//         onChange={handleChange}
//       />
//     </label>
//     <div className='radio-row'>
//       <div className="radio">
//         <input
//           type="radio"
//           id='rent'
//           name="action"
//           value="1"
//           onChange={handleChange}
//           disabled={isUpdate} // Disable input if isUpdate is provided
//           />
//         <label className='radio-button' htmlFor="rent">Rent</label>
//       </div>
//       <div className="radio">
//         <input
//           type="radio"
//           id='sale'
//           name="action"
//           value="0"
//           // defaultChecked="checked"
//           onChange={handleChange}
//           disabled={isUpdate} // Disable input if isUpdate is provided
//         />
//         <label className='radio-button' htmlFor="sale">Sale</label>
//       </div>
//     </div>
//     {
//       formData.action == 1 &&
//       <div className="time">
//         {/* FROM TO */}
//         سيتم وضع بداية ونهاية ؟
//       </div>
//     }
//     <p>
//     {/* payment:  */}
//     التسعير:
//     </p>
//     <div className='radio-row'>
//       <div className="radio">
//         <input
//           type="radio"
//           id='cash'
//           name="feature1"
//           value="cash"
//           onChange={handleChange}
//           disabled={isUpdate} // Disable input if isUpdate is provided
//           />
//         {/* <label className='radio-button' htmlFor="cash">cash</label> */}
//         <label className='radio-button' htmlFor="cash">كاش</label>

//       </div>
//       <div className="radio">
//         <input
//           type="radio"
//           id='installment'
//           name="feature1"
//           value="installment"
//           onChange={handleChange}
//           disabled={isUpdate} // Disable input if isUpdate is provided
//         />
//         {/* <label className='radio-button' htmlFor="installment">installment</label> */}
//         <label className='radio-button' htmlFor="installment">تقسيط</label>
//       </div>
//     </div>
//   </div>
//   )};
const Tab4 = ({ formData, handleChange, isUpdate }) => {
  const landFeaturesAr = [
    "كمبوند",
    "شارع رئيسي",
    "ناصية شارع رءيسي",
    "اطلالة حديقة",
    "اطلالة ساحة فناء",
    "منطقة صناعات",
    "عداد مياه",
    "عداد كهرباء",
    "انترنت",
    "منطقة خدمات",
  ];
  const industrialFeaturesAr = [
    "شارع رئيسي",
    "ناصية شارع رءيسي",
    "اطلالة حديقة",
    "اطلالة ساحة فناء",
    "منطقة صناعات",
    "عداد مياه",
    "عداد كهرباء",
    "انترنت",
    "منطقة خدمات",
  ];
  const commercialFeaturesAr = [
    "واجهة زجاجية",
    "دش مركزي",
    "مول تجاري",
    "مول اداري",
    "انترنت",
    "مداخل رخام",
    "بلكونة",
    "انظمة اضاءة حديثة",
    "انترنت",
    "كاميرات مراقبة",
    "اسانسير",
    "امن وحراسة",
    "جراج",
    "مبني طبي فقط",
    "منطقة صناعات",
    "اجهزة المطبخ",
    "اطلالة علي مساحات خضراء",
    "امن وحراسة",
    "ناصية شارع",
  ];
  const residentialFeaturesAr = [
    "كمبوند",
    "حمام سباحة",
    "وحدة تخزين",
    "شارع رئيسي",
    "ناصية شارع رءيسي",
    "اطلالة حديقة",
    "اطلالة ساحة واسعة",
    "منطقة صناعات",
    "واجهة كلاسيكية",
    "مداخل رخام",
    "جراج",
    "انترنت",
    "امن وحراسة",
    "كاميرات مراقبة",
    "بلكونة",
    "اسانسيبر",
    "تكييف وتدفئة",
    "جيم",
    "اجهزة المطبخ",
    "دش مركزي",
    "مساحات خضراء",
    "مسطحات مائية",
    "انظمة اضاءة حديثة",
    "منزل ذكي",
    "منطقة ؟؟؟ وترفيه",
    "؟؟؟؟ كمبوند",
  ];

  const featuresByType = {
    housing: [
      "كمبوند",
      "حمام سباحة",
      "وحدة تخزين",
      "شارع رئيسي",
      "ناصية شارع رئيسي",
      "اطلالة حديقة",
      "اطلالة ساحة واسعة",
      // "منطقة صناعات",
      "منطقة خدمات",
      "واجهة كلاسيكية",
      "مداخل رخام",
      "جراج",
      "انترنت",
      "امن وحراسة",
      "كاميرات مراقبة",
      "بلكونة",
      "اسانسيبر",
      "تكييف وتدفئة",
      "جيم",
      "اجهزة المطبخ",
      "دش مركزي",
      "مساحات خضراء",
      "مسطحات مائية",
      "انظمة اضاءة حديثة",
      "منزل ذكي",
      "منطقة تسوق وترفيه",
      "ميني كمباوند",
    ],
    industrial: [
      "شارع رئيسي",
      "ناصية شارع رئيسي",
      "اطلالة حديقة",
      "اطلالة ساحة فناء",
      "منطقة صناعات",
      "عداد مياه",
      "عداد كهرباء",
      "انترنت",
      "منطقة خدمات",
    ],
    commercial: [
      "واجهة زجاجية",
      "دش مركزي",
      "مول تجاري",
      "مول اداري",
      "انترنت",
      "مداخل رخام",
      "بلكونة",
      "انظمة اضاءة حديثة",
      "انترنت",
      "كاميرات مراقبة",
      "اسانسير",
      "امن وحراسة",
      "جراج",
      "مبني طبي فقط",
      "منطقة صناعات",
      "اجهزة المطبخ",
      "اطلالة علي مساحات خضراء",
      "امن وحراسة",
      "ناصية شارع",
    ],
    coastal: [
      "فندق",
      "اطلالة مباشرة علي البحر",
      "صف اول علي البحر",
      "اطلالة حمام سباحة",
      "اطلالة مساحة خضراء",
      "اطلالة مساحة واسعة",
      "امن وحراسة",
      "اسانسير",
      "شارع رئيسي",
      "ناصية شارع رئيسي",
      "كاميرا مراقبة",
      "جراج",
      "بلكونة",
      "تكييف وتدفئة",
      "جيم",
      "اجهزة المطبخ",
      "منطقة خدمات وترفيه",
      "حمام سباحة",
      "دش مركزي",
      "واجهة كلاسيكية",
      "واجهة مودرن",
      "مدخل رخام",
      "مساحات خضراء",
      "مسطحات مائية",
      "انظمة اضاءة حديثة",
      "انترنت",
      "تكنولوجيا المنزل الذكي",
    ],
    land: [
      "كمبوند",
      "شارع رئيسي",
      "ناصية شارع رءيسي",
      "اطلالة حديقة",
      "اطلالة ساحة فناء",
      "منطقة صناعات",
      "عداد مياه",
      "عداد كهرباء",
      "انترنت",
      "منطقة خدمات",
    ],
  };

  console.log("from tap 4: ", formData.type);

  let currentFeatures = featuresByType[formData.type] || [];

  // const additionalFeaturesEn = [
  //   "Corner Lot",
  //   "Duplex",
  //   "Sea View",
  //   "Private Parking",
  //   "Private Garden",
  //   "Balcony or Terrace",
  //   "Storage Room",
  //   "Security and Surveillance",
  //   "Elevator",
  //   "Private Pool",
  //   "Gym",
  //   "Children's Play Area",
  //   "Maid's Room or Laundry Room"
  // ];
  return (
    <div className="tab-4">
      <h2 className="ar">:مزايا اضافية</h2>
      {/* <h2 className='en'>Additional  Features</h2> */}

      <ul>
        {currentFeatures.map((e, i) => {
          return (
            <li key={i}>
              <input
                onChange={handleChange}
                type="checkbox"
                name={`feature${i}`}
                id={e}
                value={e}
              />
              <label htmlFor={e}>{e}</label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

// const PropertyForm  = ({ isUpdate, onAddProp}) => {
//   const classes = ["one", "two", "three", "four"];
//   const loginData = useContext(DataContext).loginState;
//   const token = loginData.token;
//   const locationRef = useRef();
//   const [formData, setFormData] = useState({
//     address: '',
//     location: '',
//     city: 'cairo',

//     type: '',
//     size: 0,
//     bedrooms: 0,
//     bathrooms: 0,

//     description: '',
//     image: [],
//     price: 0,
//     action: 0,

//     feature1: null,
//   });

//   const [activeTab, setActiveTab] = useState(1);
//   const [validationError, setValidationError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   // const handleNext = (e) => {
//   //   e.preventDefault();
//   //   setActiveTab(activeTab + 1);
//   // };

//   const handleNext = (e) => {
//     e.preventDefault();
//     if (activeTab === 1) {
//       if (!formData.address || !formData.location || !formData.city) {
//         setValidationError('Please fill in all fields in Step 1.');
//         return;
//       }
//     } else if (activeTab === 2) {

//       // if((formData.type === 'house' || formData.type === 'apartment' || formData.type === 'villa' ) && (!formData.finishing_type || !formData.size)){
//       //   setValidationError('Please fill in all fields in Step 2.');
//       // }
//       // else if (formData.type !== 'land' && ( !formData.type || !formData.size || !formData.bedrooms || !formData.bathrooms || !formData.finishing_type|| !formData.activity_type)) {
//       //   setValidationError('Please fill in all fields in Step 2.');
//       //   return;
//       // }
//       // else if(formData.type === 'land' && (!formData.activity_type || !formData.size)){
//       //   setValidationError('Please fill in all fields in Step 2.');
//       //   return;
//       // }
//       if(!formData.type || !formData.size){
//         // setValidationError('make sure that you selected type and size');
//         setValidationError('يرجي التأكد من ملئ البيانات');

//         return;
//       } else if (formData.type === 'land' && !formData.activity_type) {
//         // setValidationError('make sure that you selected activity type');
//         setValidationError('يرجي التأكد من ملئ البيانات');

//         return;
//       } else if ((['house', 'apartment', 'villa'].includes(formData.type)) && (!formData.finishing_type || !formData.bedrooms || !formData.bathrooms)) {
//         // setValidationError('make sure that you filled finishing type and rooms');
//         setValidationError('يرجي التأكد من ملئ البيانات');

//         return;
//       } else if (formData.type === 'house' && !formData.activity_main){
//         // setValidationError('please select floors');
//         setValidationError('يرجي التأكد من ملئ البيانات');

//         return;
//       } else if (
//         (formData.type === "industrial" ||
//         formData.type === "coastal" ||
//         formData.type === "commercial")
//         && (!formData.activity_type || !formData.finishing_type || !formData.bedrooms || !formData.bathrooms)){
//         // setValidationError('make sure that you fill data');
//         setValidationError('يرجي التأكد من ملئ البيانات');
//         return;
//       }
//     } else if (activeTab === 3) {
//       if (!formData.description || !formData.price || formData.image.length === 0) {
//         // setValidationError('Please fill in all fields in Step 3.');
//         setValidationError('يرجي التأكد من ملئ البيانات');

//         return;
//       }
//     }
//     setValidationError('يرجي التأكد من ملئ البيانات');
//     setActiveTab(activeTab + 1);
//   };

//   const handlePrev = (e) => {
//     e.preventDefault();
//     setActiveTab(activeTab - 1);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     // console.log("form: ", formData);
//     // console.log("token: ", token);
//     // console.log();
//     if(isUpdate){
//       const updateData = {
//         price: formData.price,
//         description: formData.description
//       }
//       axios.patch('https://app.having.market/api/tasks/'+isUpdate.id, updateData, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/x-www-form-urlencoded'
//         }
//       }).then(response => {
//         console.log(response);
//       }).catch(error => {
//         setIsLoading(false);
//         console.error(error);
//       });
//     } else {
//       console.log("axios: ", formData);
//       axios.post('https://app.having.market/api/tasks', formData, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data'
//         }
//       }).then(response => {
//         console.log(response);
//         if(response.status === 200){
//           console.log("added");
//           onAddProp();
//         }
//       }).catch(error => {
//         setIsLoading(false);
//         console.error(error);
//       });
//     }
//   };

//   // const handleChange = (e) => {
//   //   const { name, value, type } = e.target;
//   //   if (name === 'type' && value === 'land') {
//   //     setFormData({
//   //       ...formData,
//   //       [name]: type === 'number' ? Number(value) : value,
//   //       finishing_type: null
//   //     });
//   //   } else {
//   //   setFormData({
//   //     ...formData,
//   //     [name]: type === 'number' ? Number(value) : value,
//   //   })}
//   //   console.log(formData);
//   // };
//   const handleChange = (e) => {
//     const { name, value, type } = e.target;
//     console.log("name: ", name);
//     console.log("value: ", value);
//     console.log("type: ", type);
//     setFormData(prevState => {
//       const newFormData = { ...prevState, [name]: type === 'number' ? Number(value) : value };
//       // Conditionally remove activity_type if type changes to a value that doesn't require it
//       // if (name === 'type' && !(value === 'land' || value === 'commercial' || value === 'industrial')) {
//       //   newFormData.activity_type = null;
//       // }
//       if (name === 'type' && value === 'land') {
//         newFormData.finishing = null;
//       }
//       //making floors null
//       if (name === 'type' && value !== 'house') {
//         newFormData.floors = null;
//       }
//       return newFormData;
//     });
//     console.log(formData);
//     // Handle UI changes for finishing type and activity type based on type selection
//     // if (name === 'type') {
//     //   handleChoosingHouse();
//     // }
//   };

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     setFormData({
//       ...formData,
//       image: files
//     });
//   };

//   function changeLocation(e){
//     const mapLink = `https://www.google.com/maps?q=${e.lat},${e.lng}`;
//     console.log(mapLink);
//     setFormData({
//       ...formData,
//       location: mapLink,
//     });
//     if (locationRef.current) {
//       locationRef.current.value = mapLink;
//     }
//   }

//   function handleFindeLocation () {
//     console.log("finde location");
//   }
//   return (
//     <>
//     <form className="property-form" onSubmit={handleSubmit}>
//       <div className={`steps-row ${classes[activeTab - 1]}`}>
//         <div id="progress" className={`${classes[activeTab - 1]}`}></div>
//         {/* <div className="col" style={activeTab >= 1 ? {color: "white"} : null}>step 1</div>
//         <div className="col" style={activeTab >= 2 ? {color: "white"} : null}>step 2</div>
//         <div className="col" style={activeTab >= 3 ? {color: "white"} : null}>step 3</div>
//         <div className="col" style={activeTab >= 4 ? {color: "white"} : null}>step 4</div> */}
//         <div className="col" style={activeTab >= 1 ? {color: "white"} : null}>الخطوة 1</div>
//         <div className="col" style={activeTab >= 2 ? {color: "white"} : null}>الخطوة 2</div>
//         <div className="col" style={activeTab >= 3 ? {color: "white"} : null}>الخطوة 3</div>
//         <div className="col" style={activeTab >= 4 ? {color: "white"} : null}>الخطوة 4</div>
//       </div>

//       {
//         isLoading ? <LoadingCircle/> :
//       <>
//       <div className={`form-tabs ${classes[activeTab - 1]}`}>
//         <Tab1
//           formData={formData}
//           handleChange={handleChange}
//           isUpdate={isUpdate}
//           locationRef={locationRef}
//          />
//         <Tab2
//          formData={formData}
//          handleChange={handleChange}
//          isUpdate={isUpdate} />
//         <Tab3
//          formData={formData}
//          handleChange={handleChange}
//          handleImageChange={handleImageChange}
//          isUpdate={isUpdate} />
//         <Tab4
//          formData={formData}
//          handleChange={handleChange}
//          handleImageChange={handleImageChange}
//          isUpdate={isUpdate} />
//       </div>
//       {validationError && <div className="error-message">{validationError}</div>}
//       <div className="button-row">
//         {activeTab === 4 && <button type="submit">Submit</button>}
//         {activeTab < 4 && <button onClick={(e) => handleNext(e)} id='next'>التالي</button>}
//         {activeTab > 1 && <button onClick={(e) => handlePrev(e)} id='prev'>السابق</button>}
//       </div>
//       </>
//       }
//     </form>
//       {
//         activeTab === 1 &&
//         <>
//           {/* <div className="popup-bar">
//             <button onClick={handleFindeLocation}>
//               <i className="fa-solid fa-map-location-dot"></i>
//             </button>
//             <LoadingCircle></LoadingCircle>
//           </div> */}

//           <InputMap onLocationChange={changeLocation} />
//         </>
//       }
//       </>
//   );
// }

const NumberInputWithButtons = ({
  name,
  value,
  title,
  onChange,
  placeholder,
}) => {
  const handleIncrement = () => {
    const newValue = value === "" ? 0 : parseInt(value, 10);
    onChange({ target: { name, value: newValue + 1, type: "number" } });
  };

  const handleDecrement = () => {
    const newValue = value === "" ? 0 : parseInt(value, 10);
    onChange({
      target: { name, value: newValue > 0 ? newValue - 1 : 0, type: "number" },
    });
  };

  return (
    <div className="number-input">
      <label htmlFor={name}>
        <p>{title}</p>
      </label>
      <button type="button" onClick={handleDecrement}>
        -
      </button>
      <input
        id={name}
        type="number"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <button type="button" onClick={handleIncrement}>
        +
      </button>
    </div>
  );
};

const PropertyForm = ({ isUpdate, onAddProp }) => {
  const loginData = useContext(DataContext).loginState;
  const token = loginData.token;
  const locationRef = useRef();
  const [updating, setUpdating] = useState(isUpdate);
  console.log(updating);
  const [activeTab, setActiveTab] = useState(1);
  // const [validationError, setValidationError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const classes = ["one", "two", "three", "four"];
  const [filteredActivities, setFilteredActivities] = useState([]);

  const [formData, setFormData] = useState({
    address: "",
    type: "",
    size: "",
    bedrooms: "",
    bathrooms: "",
    description: "",
    location: "",
    city: "",
    gover: "",
    image: null,
    activity: "",
    finishing: "",
    feature1: "",
    feature2: "",
    feature3: "",
    price: "",
    action: "",
    floors: "",
    payment: "",
  });

  if (updating !== null && typeof isUpdate === "object") {
    setUpdating(null);
    console.log("aa");
    setFormData((prevFormData) => ({
      ...prevFormData,
      address: isUpdate.address || "",
      type: isUpdate.type || "",
      size: isUpdate.size || "",
      bedrooms: isUpdate.bedrooms || "",
      bathrooms: isUpdate.bathrooms || "",
      description: isUpdate.description || "",
      location: isUpdate.location || "",
      city: isUpdate.city.name || "",
      gover: isUpdate.gover.name || "",
      image: isUpdate.image || null,
      activity: isUpdate.activity || "",
      finishing: isUpdate.finishing || "",
      price: isUpdate.price || "",
      action: isUpdate.action || "",
      floors: isUpdate.floors || "",
      payment: isUpdate.payment || "",
    }));
  }

  console.log("formData: ", formData);
  console.log("isUpdate: ", isUpdate);
  // const handleChange = (e) => {
  //   const { name, value, type, files } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: type === 'file' ? files[0] : value
  //   });

  //   if (name === 'type') {
  //     const selectedType = value;
  //     const activitiesForType = Activities.find(activity => activity.type.en === selectedType);
  //     setFilteredActivities(activitiesForType ? activitiesForType.activities : []);
  //     setFormData(prevState => ({ ...prevState, activity: '' }));
  //   }
  //   if(name === 'image'){
  //     console.log("image");
  //     const files = Array.from(e.target.files);
  //     setFormData({
  //       ...formData,
  //       image: files
  //     });
  //   }
  // };

  const handleChange = (input, isSelect = false) => {
    if (isSelect) {
      // Handle the change from a Select component
      const { name, value } = input;
      console.log("name: ", name);
      console.log("value: ", value);
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));

      // Handle specific logic for `type` field
      if (name === "type") {
        const selectedType = value;
        const activitiesForType = Activities.find(
          (activity) => activity.type.en === selectedType,
        );
        setFilteredActivities(
          activitiesForType ? activitiesForType.activities : [],
        );
        setFormData((prevState) => ({ ...prevState, activity: "" }));
      }

      // Handle specific logic for `gover` and `city` fields
      // if (name === 'gover') {
      // setSelectedGovernorate(value); // Update selected governorate state
      // setSelectedCity(null); // Reset selected city when governorate changes
      // }

      // if (name === 'city') {
      // setSelectedCity(value); // Update selected city state
      // }
    } else {
      // Handle the change from a normal input
      const { name, value, type, files } = input.target;
      setFormData((prevState) => ({
        ...prevState,
        [name]: type === "file" ? files[0] : value,
      }));

      // Handle specific logic for `type` field
      if (name === "type") {
        const selectedType = value;
        const activitiesForType = Activities.find(
          (activity) => activity.type.en === selectedType,
        );
        setFilteredActivities(
          activitiesForType ? activitiesForType.activities : [],
        );
        setFormData((prevState) => ({ ...prevState, activity: "" }));
      }

      // Handle specific logic for `image` field
      if (name === "image") {
        const files = Array.from(input.target.files);
        setFormData((prevState) => ({
          ...prevState,
          image: files,
        }));
      }
    }
  };

  const handleDeleteImage = (imageToDelete) => {
    setFormData((prevState) => ({
      ...prevState,
      image: prevState.image.filter((image) => image !== imageToDelete),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    console.log(formData);
    try {
      const response = await axios.post(
        "https://app.having.market/api/tasks",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      console.log(response);
      // console.log(response.data);
      onAddProp();
    } catch (error) {
      setIsLoading(false);
      console.error("Error submitting form:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    console.log(formData);
    try {
      const response = await axios.patch(
        "https://app.having.market/api/tasks",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      console.log(response);
      // console.log(response.data);
      onAddProp();
    } catch (error) {
      setIsLoading(false);
      console.error("Error submitting form:", error);
    }
  };
  const handleNext = (e) => {
    e.preventDefault();
    setActiveTab(activeTab + 1);
  };

  const handlePrev = (e) => {
    e.preventDefault();
    setActiveTab(activeTab - 1);
  };

  const changeLocation = (e) => {
    const mapLink = `https://www.google.com/maps?q=${e.lat},${e.lng}`;
    console.log(mapLink);
    setFormData({
      ...formData,
      location: mapLink,
    });
    if (locationRef.current) {
      locationRef.current.value = mapLink;
    }
  };

  return (
    <div className="form-wrapper">
      <form className="property-form" onSubmit={handleSubmit}>
        {isLoading ? (
          <LoadingCircle />
        ) : (
          <>
            <div className={`steps-row ${classes[activeTab - 1]}`}>
              <div id="progress" className={`${classes[activeTab - 1]}`}></div>
              {/* <div className="col" style={activeTab >= 1 ? {color: "white"} : null}>step 1</div>
          <div className="col" style={activeTab >= 2 ? {color: "white"} : null}>step 2</div>
          <div className="col" style={activeTab >= 3 ? {color: "white"} : null}>step 3</div>
          <div className="col" style={activeTab >= 4 ? {color: "white"} : null}>step 4</div> */}
              <div
                className="col"
                style={activeTab >= 1 ? { color: "white" } : null}
              >
                اولا
              </div>
              <div
                className="col"
                style={activeTab >= 2 ? { color: "white" } : null}
              >
                ثانيا
              </div>
              <div
                className="col"
                style={activeTab >= 3 ? { color: "white" } : null}
              >
                ثالثا
              </div>
              <div
                className="col"
                style={activeTab >= 4 ? { color: "white" } : null}
              >
                رابعا
              </div>
            </div>
            <div className={`form-tabs ${classes[activeTab - 1]}`}>
              <div className="tab-1">
                <label htmlFor="">
                  <p>العنوان</p>
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                    disabled={isUpdate} // Disable input if isUpdate is provided
                    required
                  />
                </label>
                <label htmlFor="">
                  <p>الموقع</p>
                  <input
                    type="text"
                    ref={locationRef}
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    disabled={isUpdate} // Disable input if isUpdate is provided
                  />
                </label>

                <Location
                  handleChange={(input) => handleChange(input, true)}
                  city={formData.city}
                  gover={formData.gover}
                />
              </div>

              <div className="tab-2">
                <label>
                  <p>النوع</p>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                    disabled={isUpdate} // Disable input if isUpdate is provided
                  >
                    <option value="">اختار النوع</option>
                    <option value="housing">سكني</option>
                    <option value="industrial">صناعي</option>
                    <option value="coastal">ساحلي</option>
                    <option value="commercial">تجاري</option>
                    <option value="land">أرض</option>
                  </select>
                </label>

                <label>
                  <p>النشاط\التصنيف</p>
                  <select
                    name="activity"
                    value={formData.activity}
                    onChange={handleChange}
                    required
                    disabled={isUpdate} // Disable input if isUpdate is provided
                  >
                    <option value="">اختار النشاط</option>
                    {filteredActivities.map((activity, index) => (
                      <option key={index} value={activity.en}>
                        {activity.ar}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  نوع التشطيب
                  <select
                    name="finishing"
                    onChange={handleChange}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      اختار نوع التشطيب
                    </option>
                    <option value="unfinished">بدون التشطيب</option>
                    <option value="semi_finished">نصف التشطيب</option>
                    <option value="finished">كاملة التشطيب</option>
                    <option value="luxury">سوبر لوكس</option>
                    <option value="furnished">شامل الفرش</option>
                  </select>
                </label>

                <div className="prop-numbers">
                  <NumberInputWithButtons
                    name="floors"
                    value={formData.floors}
                    onChange={handleChange}
                    placeholder="Floors"
                    title={"الادوار"}
                    disabled={isUpdate} // Disable input if isUpdate is provided
                  />
                  <NumberInputWithButtons
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                    placeholder="Size"
                    title={"المساحة بالمتر"}
                    disabled={isUpdate} // Disable input if isUpdate is provided
                  />
                </div>
                <div className="prop-numbers">
                  <NumberInputWithButtons
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    placeholder="Bedrooms"
                    title={"الغرف"}
                    disabled={isUpdate} // Disable input if isUpdate is provided
                  />
                  <NumberInputWithButtons
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleChange}
                    placeholder="Bathrooms"
                    title={"الحمامات"}
                    disabled={isUpdate} // Disable input if isUpdate is provided
                  />
                </div>
              </div>

              <div className="tab-3">
                <label htmlFor="description">
                  <p>الوصف</p>
                  <textarea
                    id="description"
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label htmlFor="description">
                  <p>الصور</p>
                  <input
                    type="file"
                    name="image"
                    onChange={handleChange}
                    required
                    accept="image/*"
                    multiple
                    disabled={isUpdate} // Disable input if isUpdate is provided
                  />
                  <ImageSlider
                    images={formData.image}
                    height={100}
                    onDelete={handleDeleteImage}
                  />
                </label>

                <label htmlFor="price">
                  <p>السعر</p>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    disabled={isUpdate} // Disable input if isUpdate is provided
                  />
                </label>
                <div className="radio-row">
                  <div className="radio">
                    <input
                      type="radio"
                      id="sell"
                      name="action"
                      value="0"
                      onChange={handleChange}
                      disabled={isUpdate} // Disable input if isUpdate is provided
                    />
                    {/* <label className='radio-button' htmlFor="cash">cash</label> */}
                    <label className="radio-button" htmlFor="sell">
                      بيع
                    </label>
                  </div>
                  <div className="radio">
                    <input
                      type="radio"
                      id="rent"
                      name="action"
                      value="1"
                      onChange={handleChange}
                      disabled={isUpdate} // Disable input if isUpdate is provided
                    />
                    {/* <label className='radio-button' htmlFor="installment">installment</label> */}
                    <label className="radio-button" htmlFor="rent">
                      ايجار
                    </label>
                  </div>
                </div>
                <div className="radio-row">
                  <div className="radio">
                    <input
                      type="radio"
                      id="cash"
                      name="payment"
                      value="cash"
                      onChange={handleChange}
                      disabled={isUpdate} // Disable input if isUpdate is provided
                    />
                    {/* <label className='radio-button' htmlFor="cash">cash</label> */}
                    <label className="radio-button" htmlFor="cash">
                      كاش
                    </label>
                  </div>
                  <div className="radio">
                    <input
                      type="radio"
                      id="installment"
                      name="payment"
                      value="installment"
                      onChange={handleChange}
                      disabled={isUpdate} // Disable input if isUpdate is provided
                    />
                    {/* <label className='radio-button' htmlFor="installment">installment</label> */}
                    <label className="radio-button" htmlFor="installment">
                      تقسيط
                    </label>
                  </div>
                </div>
              </div>

              <Tab4 formData={formData} handleChange={handleChange} />
            </div>
            <div className="button-row">
              {activeTab === 4 && <button type="submit">Submit</button>}
              {activeTab < 4 && (
                <button onClick={(e) => handleNext(e)} id="next">
                  التالي
                </button>
              )}
              {activeTab > 1 && (
                <button onClick={(e) => handlePrev(e)} id="prev">
                  السابق
                </button>
              )}
            </div>
          </>
        )}
      </form>
      {activeTab === 1 && <InputMap onLocationChange={changeLocation} />}
    </div>
  );
};

export default PropertyForm;
