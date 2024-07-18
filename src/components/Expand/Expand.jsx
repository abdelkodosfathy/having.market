import './Expand.css';

const Expand = ({ title, children, onExpand, id, expandId}) => {
  const isExpanded = expandId === id

  const handleClick = (e) => {
    isExpanded ? 
    onExpand(null) : onExpand(id)
  };


  return (
    <div className={`expand-card ${isExpanded ? 'expanded' : ''}`}>
      <div className="expand-card-header">
        <h2 onClick={handleClick} >
          <span style={{display: "flex", gap:10}}>
            <i className={`fa-solid fa-caret-${isExpanded ? "up" : "down"}`}></i>
            {/* <i class="fa-solid fa-square-minus"></i> */}
          </span>
          
          {title}
        </h2>
      </div>
      {isExpanded && (
        <div className="expand-card-content">
          {children}
        </div>
      )}
    </div>
  );
};

export default Expand;
