import React, { useRef, useEffect } from 'react';

function OutsideClickHandler({ children }) {
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        // onOutsideClick();
        console.log('Clicked outside the element');

      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return <div ref={wrapperRef}>{children}</div>;
}

function Clicker() {
  function handleOutsideClick() {
    console.log('Clicked outside the element');
    // Add your code to handle the click outside the element here
  }

  return (
    <div>
      <h1>Click inside or outside this box</h1>
      <OutsideClickHandler onOutsideClick={handleOutsideClick}>
        <div style={{ width: "100%", height: '200px', backgroundColor: 'lightblue', padding: '20px' }}>
          {/* Content inside the element */}
        </div>
      </OutsideClickHandler>
    </div>
  );
}

export default Clicker;
