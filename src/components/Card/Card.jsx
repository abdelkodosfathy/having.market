import { useState, useContext } from "react";
import axios from "axios";
import "./card.css";
import { DataContext } from "../Context";
import Image from "./CardImage";

const Card = ({
  handleUnLoveCard,
  handleRemoveCard,
  onUpdate,
  action,
  data,
  ...props
}) => {
  // const [remove, setRemove] = useState(false);  // ask about deleting the property
  const Type = ["housing", "industrial", "coastal", "commercial", "land"];
  const TypeAr = ["سكني", "صناعي", "ساحلي", "تجاري", "ارض"];

  const darkMode = useContext(DataContext).darkMode;
  const myData = {
    ...data,
    darkMode,
  };

  const [loved, setLoved] = useState(myData.loved);
  const loginData = useContext(DataContext).loginState;
  const token = loginData.token;
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);

  function handleLovedCard(state, cardId) {
    if (loginData.login) {
      setLoved(state);
      axios({
        headers: {
          Accept: "application/vnd.api+json",
          "Content-Type": "application/vnd.api+json",
          Authorization: `Bearer ${token}`,
        },
        method: `${state ? "post" : "get"}`,
        baseURL: "https://app.having.market/api/",
        url: `${state ? "fav" : "delfav/" + cardId}`,
        data: {
          task_id: `${cardId}`,
        },
      })
        .then((e) => {
          // console.log(e);
        })
        .catch((e) => {
          // console.log(e);
        });
    } else {
      alert("u are not loged in");
    }
  }
  function handleLocation(e) {
    // console.log("location");
    window.location = e;
  }
  function handleCardClicked(e) {
    const cardAction = e.target.tagName.toLowerCase();
    if (cardAction === "i" || cardAction === "a" || cardAction === "button") {
      console.log("clicked: ", cardAction);
    } else {
      // console.log(myData);
      props.onSelect(myData);
      document.querySelector(".card-viewer").scrollTo({
        top: 0,
        // behavior: "smooth"
      });
    }
  }
  // console.log(myData.price);
  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Phone number copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };
  // console.log("card payment: ", myData.payment?.price);

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Usage example:
  const formattedPrice = formatPrice(myData.payment?.price || 0);
  return (
    // <div className="card-container">
    <div
      className={`card card-ar ${myData.darkMode && "dark"} 
      ${props.selectedIndex === myData.id && "selected"}`}
      key={props.key}
      onClick={(e) => handleCardClicked(e)}
    >
      {/* <div className="card-img"> */}
      {/* {
          myData.img[0] ? <img loading='lazy' src={`https://app.having.market/public/images/${myData.img[0].img_name}`}/> : null
        } */}
      {myData.img[0] ? (
        <Image
          src={`https://app.having.market/public/images/${myData.img[0].img_name}`}
          alt="Card image"
        />
      ) : null}
      {/* </div> */}
      <div className="card-data">
        <h2>
          {TypeAr[Type.indexOf(myData.type)]}: {props.activities}
        </h2>
        <div className="card-text">
          <p className="card-city">{myData.city.name}</p>
          <p>{myData.address}</p>
        </div>
        <h3>
          {formattedPrice !== 0 ? `${formattedPrice} جنيه` : "لا يوجد سعر"}
        </h3>
        <div className="dep-features">
          {myData.bedrooms ? (
            <span>
              <i className="fa-solid fa-bed"></i> {myData.bedrooms}
            </span>
          ) : null}
          {myData.bathrooms ? (
            <span>
              <i className="fa-solid fa-bath"></i> {myData.bathrooms}
            </span>
          ) : null}
          {myData.size ? (
            <span>
              <i className="fa-solid fa-ruler-combined"></i> {myData.size}
              م²
            </span>
          ) : null}
        </div>
        <div className="card-btns">
          {/* <button className='card-phone-btn'>
              <i class="fa-brands fa-whatsapp"></i>
            </button> */}
          <a
            href={`https://wa.me/+2${myData.user.phone}`}
            className="card-whatsapp-btn"
          >
            <i className="fa-brands fa-whatsapp"></i>
          </a>
          {/* <button className='card-phone-btn' onClick={() => setShowPhoneNumber(prev => !prev)}>
              {showPhoneNumber?
              myData.user.phone : <i className="fa-solid fa-phone"></i>}
            </button> */}
          <a
            className="card-phone-btn"
            onClick={() => {
              setShowPhoneNumber((prev) => !prev);
              if (!showPhoneNumber) copyToClipboard(myData.user.phone);
            }}
          >
            {showPhoneNumber ? (
              <p style={{ color: "white" }}>{myData.user.phone}</p>
            ) : (
              <i className="fa-solid fa-phone"></i>
            )}
          </a>
          {/* <button className='card-mail-btn'> */}
          <a className="card-mail-btn" href={`mailto:+2${myData.user.email}}`}>
            <i className="fa-solid fa-envelope"></i>
          </a>
          {/* </button> */}
        </div>
        <div className="card-icons icons-ar">
          {action === "fav" ? (
            <>
              <i
                className="fa-solid fa-heart"
                onClick={() => handleUnLoveCard(myData.id)}
              ></i>
            </>
          ) : action === "tasks" ? (
            <>
              <i
                className="fa-solid fa-xmark"
                onClick={() => handleRemoveCard(myData)}
              ></i>
              <i className="fa-solid fa-pen" onClick={onUpdate}></i>
            </>
          ) : loved ? (
            <i
              className="fa-solid fa-heart"
              onClick={() => handleLovedCard(false, myData.id)}
            ></i>
          ) : (
            <i
              className="fa-regular fa-heart"
              onClick={() => handleLovedCard(true, myData.id)}
            ></i>
          )}

          <i
            className="fa-solid fa-location-dot"
            onClick={() => {
              handleLocation(myData.location);
            }}
          ></i>
        </div>
      </div>
    </div>
    // </div>
  );
};
export default Card;
