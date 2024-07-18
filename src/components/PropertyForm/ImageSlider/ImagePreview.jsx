// import { useEffect, useState } from "react";

// const ImagePreview = ({ image, height }) => {
//     const [aspectRatio, setAspectRatio] = useState(1);
  
//     useEffect(() => {
//       const img = new Image();
//       img.src = URL.createObjectURL(image);
//       img.onload = () => {
//         setAspectRatio(img.width / img.height);
//       };
//     }, [image]);
  
//     const width = height * aspectRatio;
  
//     return (
//       <img
//         src={URL.createObjectURL(image)}
//         alt="Preview"
//         style={{ height, width, objectFit: 'contain', margin: '10px 5px' }}
//       />
//     );
//   };
  
//   export default ImagePreview;
import React from 'react';

const ImagePreview = ({ image, height, onDelete }) => {
  const handleDelete = () => {
    onDelete(image);
  };

  return (
    <div className='img-slider-continer'>
      <img
        src={URL.createObjectURL(image)}
        alt="Preview"
        style={{ height: `${height}px`, objectFit: 'contain' }}
      />
      <button
      className='img-slider-btn'
        onClick={handleDelete}
        style={{

        }}
      >
        <i className="fa-solid fa-trash-can"></i>
      </button>
    </div>
  );
};

export default ImagePreview;
