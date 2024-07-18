import React, { useState } from 'react';

const ReactCard = ({ title, content }) => {
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={`react-card ${expanded ? 'expanded' : ''}`} onClick={handleClick}>
      <div className="react-card-header">
        <h3>{title}</h3>
      </div>
      {expanded && (
        <div className="react-card-content">
          <p>{content}</p>
        </div>
      )}
    </div>
  );
};

export default ReactCard;
