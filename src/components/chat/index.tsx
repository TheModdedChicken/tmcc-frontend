import React, { useEffect, useRef, useState } from 'react';
import { ChatMessage } from '../../utility/interfaces';
import { RoomNameRegex, UsernameRegex } from '../../utility/regex';
import Button from '../button';
import TextBox from '../textbox';
import './chat.css';
const pingSound = require('../../assets/notification.mp3');

function Chat(props: {username: string, messages: ChatMessage[], createMessage: (message: string) => void}) {
  const [isScrolling, setIsScrolling] = useState(false);

  var messageElements: JSX.Element[] = [];
  for (const message of props.messages) {
    messageElements.push(<li className="chat-message">
      <h4>{message.author}</h4>
      <p>{message.message}</p>
    </li>)
  }

  setTimeout(() => {
    const element = document.getElementById("chatbox");
    if (!element) return;
    console.log(isScrolling)
    if (!isScrolling) element.scroll({
      top: element.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
  }, 1000)

  return (
    <>
      <audio id="pingSound">
        <source src={pingSound} type="audio/mp3"/>
      </audio> 
      <div 
        id="chatbox" 
        onScroll={(e) => setIsScrolling(isUserAtBottom(e.currentTarget))}
      >
        <ul id="chatscroller">
          {messageElements}
        </ul>
      </div>
      <div>
        <TextBox id="chat-textbox" name={props.username} clearOnSubmit={true} onSubmit={(e) => props.createMessage(e.currentTarget.value)}></TextBox>
      </div>
    </>
  );
}

export default Chat;

function isUserAtBottom(element: HTMLElement): boolean {
  const threshold = 20;
  const position = element.scrollTop + element.offsetHeight;
  const height = element.scrollHeight;
  return position < height - threshold;
}