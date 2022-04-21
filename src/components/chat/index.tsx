import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import React, { useEffect, useRef, useState } from 'react';
import { ChatMessage } from '../../utility/interfaces';
import { RoomNameRegex, UsernameRegex } from '../../utility/regex';
import Button from '../button';
import TextBox from '../textbox';
import './chat.css';
const pingSound = require('../../assets/notification.mp3');

import outIcon from '../../assets/out.svg'
import userIcon from '../../assets/user.svg'
import TextArea from '../textarea';

function Chat(props: {username: string, userCount: number, messages: ChatMessage[], createMessage: (message: string) => void, setScene: (scene: string) => void}) {
  const [isScrolling, setIsScrolling] = useState(false);

  var messageElements: JSX.Element[] = [];
  for (const message of props.messages) {
    messageElements.push(<li className="chat-message">
      <h4>{message.author}:</h4>
      <p><ReactMarkdown className="mrkdown">{message.message}</ReactMarkdown></p>
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
        id="chat-contextbox"
      >
        <button onClick={() => props.setScene("welcome")}><img src={outIcon} width={"18vmin"} height={"18vmin"}></img></button>
        <div>
          <img src={userIcon} width={"16vmin"} height={"16vmin"} style={{margin: '5px'}}></img>
          <p>{props.userCount}</p>
        </div>
      </div>
      <div 
        id="chatbox" 
        onScroll={(e) => setIsScrolling(isUserAtBottom(e.currentTarget))}
      >
        <ul id="chatscroller">
          {messageElements}
        </ul>
      </div>
      <div>
        <TextArea id="chat-textbox" name={props.username} rows={200} placeholder="Say something..." clearOnSubmit={true} onSubmit={(e) => props.createMessage(e.currentTarget.value)}></TextArea>
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