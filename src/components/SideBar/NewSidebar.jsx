import React, { useContext, useEffect, useRef, useState } from "react";
import ReactSlider from "react-slider";
import "./SideBar.css";
import Button from "./Button";
import Expand from "../Expand/Expand";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import axios from "axios";
import NumberInput from "./sidebarComponents/NumberInput";

const Radio = ({ name, onClicked, displayText, filterValue, active }) => {
  const inputRef = useRef(null);

  const handleClick = () => {
    onClicked(filterValue);
  };

  const radioStyle = {
    padding: "10px",
    cursor: "pointer",
    boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.5)",
  };
  return (
    <label
      onClick={handleClick}
      style={radioStyle}
      className={`sidebar-radio ${active ? "checked" : ""}`}
    >
      {displayText}
      <input
        type="radio"
        name={name}
        className=""
        ref={inputRef}
        checked={active}
        readOnly
      />
    </label>
  );
};

const Location = ({ handleChange }) => {
  const [governorates, setGovernorates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedGovernorate, setSelectedGovernorate] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

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
    handleChange("gover", selectedOption ? selectedOption.value : "", true);

    handleChange("city", null, true); // Ensure city prop is null or empty
  };

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption);
    handleChange("city", selectedOption ? selectedOption.value : "", true);
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

const CheckBox = ({
  title,
  boxClassName,
  onSelectActivity,
  filterName,
  filterValue,
}) => {
  const [checked, setChecked] = useState(false);

  const handleChecked = () => {
    const newChecked = !checked; // Toggle checked state
    setChecked(newChecked);

    // Call onSelectActivity to update filters based on checkbox state
    onSelectActivity(filterName, filterValue, newChecked ? false : true);
  };

  const checkboxStyle = {
    checkBox: {
      display: "none",
    },
    label: {
      display: "inline-block",
      padding: "8px 16px",
      border: "none",
      cursor: "pointer",
      boxShadow: "0px 1px 3px rgba(0,0,0,0.5)",
      WebkitBoxShadow: "0px 1px 3px rgba(0,0,0,0.5)",
    },
  };

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
        checked={checked}
        onChange={handleChecked}
        value={filterValue}
      />
    </label>
  );
};

// NumberInput component

// const NumberInput = ({ title, onChange, value, scale = 1 }) => {
//   console.log("value: ", value);
//   const [count, setCount] = useState(value || 0);
//   console.log("count: ",count);

//   const increment = () => {
//     const newCount = count + scale;
//     setCount(newCount);
//     onChange(newCount);
//   };

//   const decrement = () => {
//     if (count - scale > 0) {
//       const newCount = count - scale;
//       setCount(newCount);
//       onChange(newCount);
//     } else if(count - scale <= 0){
//       const newCount = 0;
//       setCount(newCount);
//       onChange(newCount);
//     }
//   };

//   const handleChange = (e) => {
//     const newValue = parseInt(e.target.value, 10);
//     if (!isNaN(newValue) && newValue >= 0) {
//       setCount(newValue);
//       onChange(newValue);
//     }
//   };

//   return (
//     <div className="sidebar-number-input">
//       <h3>{title}</h3>
//       <div className="sidebar-number-input-controls">
//         <button onClick={increment}>+</button>
//         <input
//           type="number"
//           value={count}
//           onChange={handleChange}
//           min="0"
//         />
//         <button onClick={decrement}>-</button>
//       </div>
//     </div>
//   );
// };

// Slider component
const Slider = ({ title, onSetValue, value, min, max }) => {
  const [values, setValues] = useState(value || [min, max]);

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
        defaultValue={[min, max]}
        ariaLabel={["Lower thumb", "Upper thumb"]}
        pearling
        minDistance={100}
        min={min}
        max={max}
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

const NewSidebar = ({
  state,
  onClose,
  onFilterChange,
  media = "big",
  priceRange,
}) => {
  const [expanded, setExpanded] = useState(null);
  const [filters, setFilters] = useState({
    type: null,
    finishing: null,
    bedrooms: null,
    bathRooms: null,
    price: null,
    payment: null,
    activities: [],
    space: [null, null],
    features: [],
    gover: "",
    city: "",
  });
  const presetSpaces = [
    { min: 100, max: 200 },
    { min: 200, max: 300 },
    { min: 300, max: 400 },
    { min: 400, max: 500 },
    { min: 500, max: 600 },
    { min: 600, max: 700 },
    { min: 700, max: 800 },
    { min: 800, max: 900 },
    { min: 900, max: 1000 },
  ];

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
        { en: "studio", ar: "ستوديو" },
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
  let currentFeatures = featuresByType[filters.type] || [];

  // functions

  const handleFilterChange = (name, value, isRemove = false, index = 0) => {
    console.log("name", name);
    console.log("value", value);

    if (name === "activeProp") {
      name = "type";
    } else if (name === "activities" || name === "features") {
      if (!isRemove) {
        // Add value to activities array
        setFilters((prevFilters) => ({
          ...prevFilters,
          [name]: [...prevFilters[name], value],
        }));
      } else {
        // Remove value from activities array
        setFilters((prevFilters) => ({
          ...prevFilters,
          [name]: prevFilters[name].filter((activity) => activity !== value),
        }));
      }
      return; // Exit early after updating activities
    }

    if (name === "space") {
      setFilters((prevFilters) => {
        const newSpace = [...prevFilters.space];
        newSpace[index] = value;
        return {
          ...prevFilters,
          space: newSpace,
        };
      });
      return;
    } else if (name === "presetSpaces") {
      setFilters((prevFilters) => {
        return {
          ...prevFilters,
          space: value,
        };
      });
      return;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };
  function handleExpand(e) {
    setExpanded(e);
  }

  function handleApplyFilters() {
    console.log("filter: ", filters);
    onFilterChange(filters);
  }

  console.log(filters);
  function onSpaceChange(newValue, state) {
    setFilters((prevFilters) => {
      const newSpace = [...prevFilters.space];
      if (state === "min") {
        newSpace[0] = +newValue;
      } else if (state === "max") {
        newSpace[1] = +newValue;
      }
      return { ...prevFilters, space: newSpace };
    });
  }
  const handleMinSpaceChange = (e) => {
    // console.log(filters.space[1], e?.value);
    if (!isNaN(e?.value) && +e?.value <= filters.space[1]) {
      // Check if newValue is a valid number
      onSpaceChange(e?.value, "min");
    }
  };

  const handleMaxSpaceChange = (e) => {
    if (!isNaN(e?.value) && +e?.value >= filters.space[0]) {
      // Check if newValue is a valid number
      onSpaceChange(e?.value, "max");
    }
  };

  const spaceOptions = [
    { value: 50, label: 50 },
    { value: 100, label: 100 },
    { value: 150, label: 150 },
    { value: 200, label: 200 },
    { value: 250, label: 250 },
    { value: 300, label: 300 },
    { value: 350, label: 350 },
    { value: 400, label: 400 },
    { value: 450, label: 450 },
    { value: 500, label: 500 },
    { value: 600, label: 600 },
    { value: 700, label: 700 },
    { value: 800, label: 800 },
    { value: 900, label: 900 },
    { value: 1000, label: 1000 },
    { value: 1200, label: 1200 },
    { value: 1400, label: 1400 },
    { value: 1600, label: 1600 },
    { value: 1800, label: 1800 },
    { value: 2000, label: 2000 },
    { value: 2500, label: 2500 },
    { value: 3000, label: 3000 },
    { value: 3500, label: 3500 },
    { value: 4000, label: 4000 },
    { value: 4500, label: 4500 },
  ];

  return (
    <div className={`bluering ${state && "show"}`}>
      <button className="sidebard-close" onClick={onClose}>
        {/* <i class="fa-solid fa-caret-right"></i> */}
        <i className="fa-solid fa-caret-left"></i>
      </button>
      <div className={`side-bar ${media}`}>
        <Expand
          id={1}
          title={"نوع العقار"}
          onExpand={handleExpand}
          expandId={expanded}
        >
          <Button
            onClicked={() => handleFilterChange("type", "commercial")}
            active={filters.type === "commercial"}
            property={"commercial"}
            title={"تجاري"}
          >
            <i className="fa-solid fa-handshake"></i>
          </Button>
          <Button
            onClicked={() => handleFilterChange("type", "housing")}
            active={filters.type === "housing"}
            property={"housing"}
            title={"سكني"}
          >
            <i className="fa-solid fa-building"></i>
          </Button>
          <Button
            onClicked={() => handleFilterChange("type", "industrial")}
            active={filters.type === "industrial"}
            property={"industrial"}
            title={"صناعي"}
          >
            <i className="fa-solid fa-industry"></i>
          </Button>
          <Button
            onClicked={() => handleFilterChange("type", "coastal")}
            active={filters.type === "coastal"}
            property={"coastal"}
            title={"ساحلي"}
          >
            <i className="fa-solid fa-house-flood-water"></i>
          </Button>
          <Button
            onClicked={() => handleFilterChange("type", "land")}
            active={filters.type === "land"}
            property={"land"}
            title={"ارض"}
          >
            <i className="fa-solid fa-map"></i>
          </Button>

          <div className="category">
            {renderTitle(filters.type)}
            <div className="prop-activity">
              {Activities.map((activity) => {
                const name = activity.type;
                if (activity.type === filters.type) {
                  // return activity.activities.map(e => (
                  //   <CheckBox
                  //     onSelectActivity={handleFilterChange}
                  //     displayText={e.ar}
                  //     filterValue={e.en}
                  //     key={e.en}
                  //     name={name}
                  //     onClicked={() => handleFilterChange('activeType', e.ar)}
                  //     active={filters.type === e.en}
                  //     title={e.ar}
                  //   />
                  // ));
                  return activity.activities.map((e) => (
                    <CheckBox
                      onSelectActivity={handleFilterChange}
                      displayText={e.ar}
                      filterName={"activities"}
                      filterValue={e.en}
                      key={e.en}
                      name={name}
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
        <Expand
          id={4}
          title={"مواصفات المالية"}
          onExpand={handleExpand}
          expandId={expanded}
        >
          <Slider
            title={"السعر"}
            min={priceRange[1]}
            max={priceRange[0]}
            onSetValue={(value) => handleFilterChange("price", value)}
            value={filters.price}
          />
          <div className="payment-row">
            <Radio
              displayText={"كاش"}
              name={"payment"}
              onClicked={() => handleFilterChange("payment", "cash")}
              active={filters.payment === "cash"}
            />
            <Radio
              displayText={"تقسيط"}
              name={"payment"}
              onClicked={() => handleFilterChange("payment", "installment")}
              active={filters.payment === "installment"}
            />
          </div>
        </Expand>
        <Expand
          id={3}
          title={"مواصفات فنية"}
          onExpand={handleExpand}
          expandId={expanded}
        >
          <div className="sidebar-spaces">
            <h3>المساحة</h3>
            <div className="sidebar-row">
              {/* <NumberInput
                title={"الي"}
                onChange={(value) =>
                  handleFilterChange("space", value, false, 1)
                }
                scale={50}
                value={
                  filters.space[1] >= filters.space[0]
                    ? filters.space[1]
                    : filters.space[0]
                }
              />
              <NumberInput
                title={"من"}
                onChange={(value) =>
                  handleFilterChange("space", value, false, 0)
                }
                scale={50}
                value={
                  filters.space[0] <= filters.space[1]
                    ? filters.space[0]
                    : filters.space[1]
                }
              /> */}

              <CreatableSelect
                className="room-input"
                name="from"
                options={spaceOptions}
                value={{
                  value: filters.space[1] || 0,
                  label: filters.space[1] ? filters.space[1].toString() : "الي",
                }}
                placeholder="الي"
                onChange={handleMaxSpaceChange}
                // isClearable
                formatCreateLabel={() => null}
              />
              <CreatableSelect
                className="room-input"
                name="from"
                options={spaceOptions}
                value={{
                  value: filters.space[0] || 0,
                  label: filters.space[0] ? filters.space[0].toString() : "من",
                }}
                placeholder="من"
                onChange={handleMinSpaceChange}
                // isClearable
                formatCreateLabel={() => null}
              />
            </div>
            {/* <div className="sidebar-presetSpaces">
              {presetSpaces.map((e, i) => {
                return (
                  <Radio
                    key={i}
                    name={"presetSpaces"}
                    onClicked={() =>
                      handleFilterChange("presetSpaces", [e.min, e.max], false)
                    }
                    displayText={`${e.min}-${e.max}`}
                    active={
                      filters.space[0] === e.min && filters.space[1] === e.max
                    }
                  />
                );
              })}
            </div> */}
            <h3>الغرف</h3>
            <div className="sidebar-row">
              <NumberInput
                title={"الغرف"}
                onChange={(value) => handleFilterChange("bedrooms", value)}
                value={filters.bedrooms}
              />
              <NumberInput
                title={"الحمامات"}
                onChange={(value) => handleFilterChange("bathRooms", value)}
                value={filters.bathRooms}
              />
            </div>
          </div>
        </Expand>
        <Expand
          id={5}
          title={"الموقع"}
          onExpand={handleExpand}
          expandId={expanded}
        >
          {/* Additional content for location */}
          <Location handleChange={handleFilterChange} />
        </Expand>
        {filters.type !== "land" && (
          <Expand
            id={2}
            title={"نوع التشطيب"}
            onExpand={handleExpand}
            expandId={expanded}
          >
            <Radio
              displayText="بدون"
              filterValue={"unfinished"}
              name={"finishing"}
              onClicked={(value) => handleFilterChange("finishing", value)}
              active={filters.finishing === "unfinished"}
            />
            <Radio
              displayText="نصف"
              filterValue={"semi_finished"}
              name={"finishing"}
              onClicked={(value) => handleFilterChange("finishing", value)}
              active={filters.finishing === "semi_finished"}
            />
            <Radio
              displayText="كامل"
              filterValue={"finished"}
              name={"finishing"}
              onClicked={(value) => handleFilterChange("finishing", value)}
              active={filters.finishing === "finished"}
            />
            <Radio
              displayText="سوبر لوكس"
              filterValue={"luxury"}
              name={"finishing"}
              onClicked={(value) => handleFilterChange("finishing", value)}
              active={filters.finishing === "luxury"}
            />
            <Radio
              displayText="شامل الفرش"
              filterValue={"furnished"}
              name={"finishing"}
              onClicked={(value) => handleFilterChange("finishing", value)}
              active={filters.finishing === "furnished"}
            />
          </Expand>
        )}
        <Expand
          id={6}
          title={"ميزات اضافية"}
          onExpand={handleExpand}
          expandId={expanded}
        >
          {/* Additional content for extra features */}
          {currentFeatures.length === 0 ? (
            <p>قم باختيار نوع العقار اولا</p>
          ) : (
            <ul className="sidebar-features">
              {currentFeatures.map((e, i) => {
                return (
                  <li key={i}>
                    <CheckBox
                      type="checkbox"
                      onSelectActivity={handleFilterChange}
                      displayText={e}
                      filterValue={`feature${i}`}
                      filterName={"features"}
                      key={`feature${i}`}
                      title={e}
                    />
                  </li>
                );
              })}
            </ul>
          )}
        </Expand>
        <div className="apply-filters">
          <button onClick={() => handleApplyFilters(filters)}>تطبيق</button>

          <button
            onClick={() =>
              setFilters({
                // city: null,
                // activities: [],
                // bathrooms: null,
                // bedrooms: null,
                // minPrice: null,
                // maxPrice: null,
                // features: [],
                // finishing: null,
                // gover: "",
                // payment: null,
                // space:[null, null],
                // type: null,
                type: null,
                activities: [],
                finishing: null,
                space: [null, null],
                bedrooms: null,
                bathRooms: null,
                price: null,
                payment: null,
                features: [],
                gover: "",
                city: "",
              })
            }
          >
            اعادة ضبط
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewSidebar;
