import React, { useState, useEffect } from "react";

const NumberInput = ({ title, onChange, value, scale = 1 }) => {
  // console.log("value: ", value);

  // Use useEffect to update count when value changes
  useEffect(() => {
    if (value === null) {
      setCount(0);
    } else {
      setCount(value);
    }
  }, [value]);

  const [count, setCount] = useState(value || null); // Initialize with null if value is null

  const increment = () => {
    if (count === 0) {
      setCount(scale);
      onChange(scale);
    } else {
      const newCount = count + scale;
      setCount(newCount);
      onChange(newCount);
    }
  };

  const decrement = () => {
    if (count === null) {
      setCount(0);
      onChange(0);
    } else if (count - scale >= 0) {
      const newCount = count - scale;
      setCount(newCount);
      onChange(newCount);
    } else {
      const newCount = 0;
      setCount(newCount);
      onChange(newCount);
    }
  };

  const handleChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue) && newValue >= 0) {
      setCount(newValue);
      onChange(newValue);
    } else if (e.target.value === "") {
      // Handle empty input
      setCount(null);
      onChange(null);
    }
  };

  return (
    <div className="sidebar-number-input">
      <h3>{title}</h3>
      <div className="sidebar-number-input-controls">
        <button onClick={increment}>+</button>
        <input
          type="number"
          value={count === null ? "" : count}
          onChange={handleChange}
          min="0"
        />
        <button onClick={decrement}>-</button>
      </div>
    </div>
  );
};

export default NumberInput;
