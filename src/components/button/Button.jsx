import React from 'react';
import './Button.css'; 

const Button = ({
  children,
  size = '',
  color = '',
  leftIcon,
  rightIcon,
  ...props
}) => {
  const baseClass = 'btn';
  const sizeClass = `btn-${size}`;
  const colorClass = `btn-${color}`;

  return (
    <button className={`${baseClass} ${sizeClass} ${colorClass}`} {...props}>
      {leftIcon && <span className="btn-icon-left">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="btn-icon-right">{rightIcon}</span>}
    </button>
  );
};

export default Button;
