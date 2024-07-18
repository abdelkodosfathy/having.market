import "./View.css";
import profile from "../../assets/profile.jpg";

import ImagesSlider from "./imagesSlider/ImagesSlider";
import { forwardRef, useContext, useState } from "react";
import { DataContext } from "../Context";

import Image from "../Card/CardImage";

const View = forwardRef(({ ...props }, ref) => {
  const Type = ["housing", "industrial", "coastal", "commercial", "land"];
  const TypeAr = ["سكني", "صناعي", "ساحلي", "تجاري", "ارض"];

  const darkMode = useContext(DataContext).darkMode;
  const data = ref.current;

  // console.log(data);

  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
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
  if (data.img[0]) {
    console.log(data.img);
  }
  return (
    <div
      key="card-view"
      className={`my-view ${darkMode && "dark"}`}
      onClick={() => {}}
    >
      {data && (
        <>
          <div className="dep-images">
            {data.img[0] && <ImagesSlider images={data.img} />}
          </div>
          <div className="dep-details">
            <div className="dep-heading">
              <h3>
                {" "}
                <i className="fa-solid fa-map-location-dot"></i> {data.address}
              </h3>
              <h5>{TypeAr[Type.indexOf(data.type)]}</h5>
            </div>
            <div className="prices">
              {/* <h3>price: {data.payment.price} L.E</h3> */}
              {/* <h3> {data.payment.price} :السعر</h3> */}
              <h3> السعر: {data.payment.price}</h3>
            </div>
            <div className="features">
              {data.bedrooms ? (
                <span>
                  <i className="fa-solid fa-bed"></i> {data.bedrooms}
                </span>
              ) : null}
              {data.bathrooms ? (
                <span>
                  <i className="fa-solid fa-bath"></i> {data.bathrooms}
                </span>
              ) : null}
              {data.size ? (
                <span>
                  <i alt="المساحة" className="fa-solid fa-ruler-combined"></i>{" "}
                  {data.size}
                </span>
              ) : null}
            </div>
            <div className="description">
              {/* <h1>Properties details</h1> */}
              <h1>تفاصيل العقار</h1>
              <p>{data.description}</p>
            </div>
          </div>
          {data.feature[0] &&
            (() => {
              const features = Object.keys(data.feature[0]).filter(
                (key) =>
                  data.feature[0][key] !== null && key.startsWith("feature"),
              );

              return (
                <div className="view-additional-features">
                  {/* <h1>Additional Features</h1> */}
                  <h1>مميزات اضافية</h1>
                  <div className="view-features">
                    <ul className="feature-list">
                      {features.map((key, index) => (
                        <li key={index}>{data.feature[0][key]}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })()}
          <div className="user-info">
            <div className="user-img">
              {data.user.profile_pic ? (
                <img
                  src={`https://app.having.market/public/images/profile/${data.user.profile_pic}`}
                  alt=""
                />
              ) : (
                <i className="fa-solid fa-user"></i>
              )}
            </div>
            <div className="user-data">
              <h3 className="owner-name">{data.user.name}</h3>
              <p>{data.user.email}</p>
            </div>
            <div className="user-contact-btn">
              <div className="card-btns">
                {/* <button className='card-phone-btn'>
              <i class="fa-brands fa-whatsapp"></i>
            </button> */}
                <a
                  href={`https://wa.me/${data.user.phone}`}
                  className="card-whatsapp-btn"
                >
                  <i className="fa-brands fa-whatsapp"></i>
                </a>
                {/* <a className='card-phone-btn' onClick={() => setShowPhoneNumber(prev => !prev)}>
              {showPhoneNumber?
              data.user.phone : <i className="fa-solid fa-phone"></i>}
            </a> */}
                <a
                  className="card-phone-btn"
                  onClick={() => {
                    setShowPhoneNumber((prev) => !prev);
                    if (!showPhoneNumber) copyToClipboard(data.user.phone);
                  }}
                >
                  {showPhoneNumber ? (
                    data.user.phone
                  ) : (
                    <i className="fa-solid fa-phone"></i>
                  )}
                </a>
                {/* <button className='card-mail-btn'> */}
                <a
                  className="card-mail-btn"
                  href={`mailto:${data.user.email}}`}
                >
                  <i className="fa-solid fa-envelope"></i>
                </a>
                {/* </button> */}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
});

export default View;
