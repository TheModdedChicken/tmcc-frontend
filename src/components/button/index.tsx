//import React, { useState } from 'react';
import React from 'react';
import './button.css';

function Button(props: { id: string, name: string, onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void }) {

  return (
    <button
      id={props.id}
      onClick={(data) => { if (props.onClick) props.onClick(data) }}
    >{props.name}</button>
  );
}

export default Button;
