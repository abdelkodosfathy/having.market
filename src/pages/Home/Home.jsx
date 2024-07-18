// import main from '../../imgs/dhabi.jpg'
import "./Home.css";
import modern from "../../imgs/modernRoom.webp";
import luxury from "../../imgs/roomluxry.webp";
import aboutimage from "../../imgs/about-section.avif";
import Footer from "./footer/Footer";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Select from "react-select";
import TagsInput from "./TagInput/TagInput";

import axios from "axios";

const classes = ["right", "left"];

const Location = ({ handleChange }) => {
  // const [governorates, setGovernorates] = useState([]);
  // const [selectedGovernorate, setSelectedGovernorate] = useState(null);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

  // const fetchGovernorates = async () => {
  //   try {
  //     const response = await axios.get("https://app.having.market/api/gover");
  //     if (response.data && Array.isArray(response.data.data)) {
  //       setGovernorates(response.data.data);
  //     } else {
  //       console.error("Unexpected response format:", response);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching governorates:", error);
  //   }
  // };

  const fetchCities = () => {
    // const selectedGovernorate = governorates.find(
    //   (gov) => gov.id === governorateId,
    // );
    // if (selectedGovernorate && Array.isArray(selectedGovernorate.city)) {
    //   setCities(selectedGovernorate.city);
    // } else {
    //   setCities([]);
    // }
    axios.get("https://app.having.market/api/cities").then((res) => {
      setCities(res.data.data);
      console.log(res);
    });
  };

  // const handleGovernorateChange = (selectedOption) => {
  //   setSelectedGovernorate(selectedOption);
  //   setSelectedCity(null); // Reset city when governorate changes
  //   fetchCities(selectedOption ? selectedOption.value : null);
  //   handleChange("gover", selectedOption ? selectedOption.value : "", true);

  //   handleChange("city", null, true); // Ensure city prop is null or empty
  // };

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption);

    selectedOption && handleChange(selectedOption);
  };

  useEffect(() => {
    fetchCities();
  }, []);

  // const governorateOptions = governorates.map((governorate) => ({
  //   value: governorate.id,
  //   label: governorate.name,
  // }));

  const cityOptions = cities.map((city) => ({
    value: city.id,
    label: city.name,
    gover: city.gover_id,
  }));

  const customStyles = {
    control: (provided) => ({
      ...provided,
      minHeight: "40px",
      borderRadius: "0 20px 20px 0",
      borderColor: "#ced4da",
      margin: "0",
      height: "100%",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#a8b3c4",
      },
    }),
    menu: (provided) => ({
      ...provided,
      top: "0",
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
    <>
      {/* <label>
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
      </label> */}
      <Select
        className="home-select"
        name="city"
        options={cityOptions}
        onChange={handleCityChange}
        value={selectedCity}
        placeholder="اختر مدينة"
        isClearable
        styles={customStyles}
      />
    </>
  );
};

const Home = ({ notAuth = false, onSearch }) => {
  const url = new URL(window.location.href);
  const token = url.searchParams.get("token");
  const phone = url.searchParams.get("phone");

  const navigate = useNavigate();
  const [active, setActive] = useState(null);
  const [cardsData, setCardsData] = useState(null);

  const [filter, setFilter] = useState({
    city: "",
    gover: "",
    bathrooms: 0,
    bedrooms: 0,
    type: null,
  });

  useEffect(() => {
    if (!phone && token) {
      console.log("phone: ", phone);
      navigate("/profile");
    }
  }, [token, phone]);

  useEffect(() => {
    axios({
      method: "get",
      baseURL: "https://app.having.market/api/",
      url: "sell",
    })
      .then((e) => {
        console.log(e);
        // setFetched(true);
        setCardsData(e.data[0]);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  console.log(cardsData);
  if (notAuth) {
    console.log("auth: please login");
  }

  // function handleCityChange(e) {
  //   console.log(e);
  //   onSearch(e);
  // }
  // function handleTypeChange() {
  //   onTypeChange(e);
  // }
  function handleChange() {
    // onTypeChange(e);
  }

  function handleSearch() {
    if (active !== null) {
      onSearch(filter);
      navigate(`/${active}`);
    } else {
      alert("من فضلك اختار بيع او ايجار");
    }
  }

  function activate(type) {
    if (type === active) {
      setActive(null);
    } else {
      setActive(type);
    }
  }

  const customStyles = {
    control: (provided) => ({
      ...provided,
      minHeight: "40px",
      borderRadius: "0",
      border: "none",
      margin: "0",
      height: "100%",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#a8b3c4",
      },
    }),
    menu: (provided) => ({
      ...provided,
      top: "0",
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

  const typeOptions = [
    { value: "housing", label: "سكني" },
    { value: "industrial", label: "صناعي" },
    { value: "commercial", label: "تجاري" },
    { value: "coastal", label: "ساحلي" },
    { value: "land", label: "ارض" },
  ];

  const handleCityChange = (selectedOption) => {
    setFilter({
      ...filter,
      city: selectedOption ? selectedOption.value : "",
      gover: selectedOption ? selectedOption.gover : "",
    });
  };

  const handleTypeChange = (selectedOption) => {
    setFilter({
      ...filter,
      type: selectedOption ? selectedOption.value : null,
    });
  };

  const handleRoomsChange = (selectedOption) => {
    setFilter({
      ...filter,
      bedrooms: selectedOption ? parseInt(selectedOption.value) : 0,
    });
  };
  const handleBathRoomsChange = (selectedOption) => {
    setFilter({
      ...filter,
      bathrooms: selectedOption ? parseInt(selectedOption.value) : 0,
    });
  };
  console.log("app filter: ", filter);
  return (
    <div className="home">
      <section className="home-main">
        <div className="home-search">
          <div className="search-filters">
            <button
              className={`${active === "buy" ? "active" : ""}`}
              onClick={() => activate("buy")}
            >
              للبيع
            </button>
            <button
              className={`${active === "rent" ? "active" : ""}`}
              onClick={() => activate("rent")}
            >
              للايجار
            </button>
          </div>
          <div className="search-bar list">
            {/* <select name="الغرف" id="">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select> */}
            <Select
              className="search-numbers first"
              name="bathrooms"
              options={[
                { value: 1, label: 1 },
                { value: 2, label: 2 },
                { value: 3, label: 3 },
                { value: 4, label: 4 },
                { value: 5, label: 5 },
              ]}
              onChange={handleBathRoomsChange}
              // value={selectedCity}
              placeholder="الحمامات"
              isClearable
              styles={customStyles}
            ></Select>
            <Select
              className="search-numbers"
              name="bedrooms"
              options={[
                { value: 1, label: 1 },
                { value: 2, label: 2 },
                { value: 3, label: 3 },
                { value: 4, label: 4 },
                { value: 5, label: 5 },
              ]}
              onChange={handleRoomsChange}
              // value={selectedCity}
              placeholder="الغرف"
              isClearable
              styles={customStyles}
            ></Select>
            <Select
              className="search-numbers last"
              name="type"
              options={typeOptions}
              onChange={handleTypeChange}
              // value={selectedCity}
              placeholder="نوع العقار"
              isClearable
              styles={customStyles}
            ></Select>
          </div>
          <div className="search-bar">
            <button className="search-btn" onClick={handleSearch}>
              ابحث
            </button>
            {/* <button>
              <i className="fa-solid fa-caret-down"></i> نوع العقار
            </button>

            <button>
              <i className="fa-solid fa-caret-down"></i> غرف وحمامات
            </button> */}
            <div className="search-input">
              {/* <input type="text" placeholder="اكتب اسم المدينة او المنطقة" /> */}
              {/* <Select /> */}
              <Location handleChange={handleCityChange} />
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
          </div>
        </div>
      </section>
      <section className="home-places">
        <h1>اكتشف منزل أحلامك مع عقاراتنا الحصرية</h1>

        {/* <div className="feature-container">
          <div className="provided-featur right">
            <img src={modern} alt="Modern Units" />
            <div className="provided-text">
              <p>
                استكشف وحداتنا الحديثة المصممة للراحة والأناقة.
                من الاستوديوهات المريحة إلى البنتهاوس الواسعة، عندنا كل اللي تحتاجه.
              </p>
            </div>
          </div>
        </div>
        <div className="provided-featur left">
          <div className="provided-text">
            <p>
              اكتشف العيش الفاخر في ممتلكاتنا الحصرية مع وسائل الراحة الحديثة والديكور الداخلي المصمم.
              ابحث عن بيت أحلامك معانا النهاردة
            </p>
          </div>
          <img src={luxury} alt="Luxury Living" />
        </div>
        <div className="provided-featur right">
          <img src={aboutimage} alt="Exceptional Customer Service" />
          <div className="provided-text">
            <p>
              استمتع بخدمة عملاء ممتازة وتجربة استلام سلسة لقطعتك الجديدة.
              إحنا هنا علشان نلبي احتياجاتك ونضمن إنك تكون راضي تمامًا عن كل حاجة في عملية الشراء والتسليم.
            </p>
          </div>
        </div>
        <div className="provided-featur left">
          <div className="provided-text">
            <p>
            استمتع بإطلالات خلابة ومساحات معيشة أنيقة في ممتلكاتنا. اختار بين الشقق الحضرية والمنازل الريفية، كل حاجة مصممة بأناقة وسحر."

            </p>
          </div>
          <img src={luxury} alt="Luxury Living" />
        </div> */}
        {cardsData ? (
          <div className="home-card">
            {cardsData.slice(0, 4).map((card, index) => (
              // <p key={index}>{card.id}</p>
              <div
                className={`provided-featur ${classes[index % 2]}`}
                onClick={() => navigate("/buy")}
                key={index}
              >
                {/* <img src={modern} alt="Modern Units" /> */}
                {card.img[0] ? (
                  <img
                    loading="lazy"
                    src={`https://app.having.market/public/images/${card.img[0].img_name}`}
                  />
                ) : null}
                <div className="provided-text">
                  <p>{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </section>
      <Footer></Footer>
    </div>
  );
};

export default Home;

{
  /*
عامية
"استمتع بخدمة عملاء ممتازة وتجربة استلام سلسة لقطعتك الجديدة. إحنا هنا علشان نلبي احتياجاتك ونضمن إنك تكون راضي تمامًا عن كل حاجة في عملية الشراء والتسليم."

"استكشف وحداتنا الحديثة المصممة للراحة والأناقة. من الاستوديوهات المريحة إلى البنتهاوس الواسعة، عندنا كل اللي تحتاجه."

"استمتع بإطلالات خلابة ومساحات معيشة أنيقة في ممتلكاتنا. اختار بين الشقق الحضرية والمنازل الريفية، كل حاجة مصممة بأناقة وسحر."

"اكتشف العيش الفاخر في ممتلكاتنا الحصرية مع وسائل الراحة الحديثة والديكور الداخلي المصمم. ابحث عن بيت أحلامك معانا النهاردة
*/
}

{
  /*
فصحي
"استمتع بخدمة عملاء ممتازة وتجربة استلام سلسة لقطعتك الجديدة. نحن هنا لتلبية احتياجاتك وضمان رضاك التام عن كل تفاصيل عملية الشراء والتسليم."

"استكشف وحداتنا الحديثة المصممة للراحة والأناقة. من الاستوديوهات المريحة إلى البنتهاوس الواسعة، تلبي ممتلكاتنا كل نمط حياة."

"استمتع بإطلالات خلابة ومساحات معيشة أنيقة في ممتلكاتنا. اختر بين الشقق الحضرية والمنازل الريفية، كل منها مصمم للأناقة والسحر."

"اكتشف العيش الفاخر في ممتلكاتنا الحصرية مع وسائل الراحة الحديثة والديكور الداخلي المصمم. ابحث عن منزل أحلامك معنا اليوم."
*/
}
{
  /* 
english
"Explore our modern units designed for comfort and style. From cozy studios to spacious penthouses, our properties cater to every lifestyle."

"Enjoy stunning views and elegant living spaces in our properties. Choose from urban lofts to townhouses, each crafted for sophistication and charm."

"Discover luxury living in our exclusive properties with state-of-the-art amenities and designer interiors. Find your dream home with us today."

"Enjoy excellent customer service and a smooth delivery experience for your new piece. We are here to meet your needs and ensure your complete satisfaction with every detail of the purchase and delivery process."
*/
}
