//import React, { useState } from 'react';
import React from 'react';
import './textbox.css';

function TextBox(props: { 
  id: string, 
  name: string, 
  infoText?: string, 
  placeholder?: string, 
  maxLength?: number, 
  minLength?: number,
  clearOnSubmit?: boolean,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onSubmit?: (event: React.FormEvent<HTMLInputElement>) => void 
}) {

  return (
    <div id={props.id}>
      <div className="textboxTagName">
        <h4>{props.name}</h4>
        <h5>{props.infoText}</h5>
      </div>
      <input className="textbox-input"
        type={"text"}
        maxLength={props.maxLength} 
        minLength={props.minLength} 
        placeholder={props.placeholder} 
        onChange={(data) => { if (props.onChange) props.onChange(data) }}
        onKeyDown={(data) => { if (data.key === "Enter") {if (props.onSubmit) props.onSubmit(data); if (props.clearOnSubmit) data.currentTarget.value = '';} }}
      ></input>
    </div>
  );
}

export default TextBox;
