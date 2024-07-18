import { act } from 'react';
import './Button.css';

const Button = ({key , children, title, onClicked, property, active}) => {
  const buttonStyle = {
    minWidth: `${title.length}ch`,
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    padding: '5px 10px',
  };
const buttonClass = `props-button ${active ? "active" : ""}`
// const active = property === trye ?
  return (
    <button
    key={key}
    onClick={() => onClicked(property)}
    className={`${buttonClass}`}
    style={buttonStyle}>
      {children}
      <p>
      {title}
      </p>
    </button>
  )
}

export default Button