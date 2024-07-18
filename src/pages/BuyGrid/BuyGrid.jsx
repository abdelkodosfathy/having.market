import React from 'react';
import './BuyGrid.css'; // Import your CSS file for styling

const BuyGrid = () => {
  return (
    <div className="grid-container">
      <div className="filters">
        {/* Filters content goes here */}
        Filters
      </div>
      <div className="selected-card">
        {/* Selected card content goes here */}
        Selected Card
      </div>
      <div className="card-view">
        {/* Card view content goes here */}
        Card View
      </div>
    </div>
  );
};

export default BuyGrid;
