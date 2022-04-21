//import React, { useState } from 'react';
import React from 'react';
import './textarea.css';

function TextArea(props: { 
  id: string, 
  name: string, 
  infoText?: string, 
  placeholder?: string, 
  maxLength?: number, 
  minLength?: number,
  clearOnSubmit?: boolean,
  cols?: number,
  rows?: number,
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void,
  onSubmit?: (event: React.FormEvent<HTMLTextAreaElement>) => void 
}) {

  return (
    <div id={props.id}>
      <div className="textboxTagName">
        <h4>{props.name}</h4>
        <h5>{props.infoText}</h5>
      </div>
      <textarea className="textarea-input"
        cols={props.cols}
        rows={props.rows}
        maxLength={props.maxLength} 
        minLength={props.minLength} 
        placeholder={props.placeholder} 
        onChange={(data) => { if (props.onChange) props.onChange(data) }}
        onKeyDown={(data) => { if (data.key === "Enter") {if (props.onSubmit) props.onSubmit(data); if (props.clearOnSubmit) data.currentTarget.value = '';} }}
      ></textarea>
    </div>
  );
}

export default TextArea;
