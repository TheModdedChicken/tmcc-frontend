import React, { useState } from 'react';
import { ChatMessage } from '../utility/interfaces';
import logo from './logo.svg';
import './App.css';

import { IWebsocketClientData, IWebsocketServerData } from '../utility/interfaces';
import Welcome from '../components/welcome';
import Chat from '../components/chat';

const ws = new WebSocket('wss://tmcc-backend.themoddedchickn.repl.co/');
const messages: ChatMessage[] = [];

function App() {
  const [getMessages, setMessages] = useState(messages)
  const [getScene, setScene] = useState("welcome");
  const [getUsername, setUsername] = useState("");
  const [getRoom, setRoom] = useState("");
  const [getUserCount, setUserCount] = useState(0);
  const [getID, setID] = useState("");

  if (ws) {
    ws.onopen = () => {
      console.log('Connected to server');
    }
    
    ws.onclose = () => {
      console.log('Disconnected from server');
      setID("");
    }
    
    ws.onmessage = (msg) => {
      const data: IWebsocketServerData = JSON.parse(msg.data.toString('utf-8'));
  
      switch (data.code) {
        case "successful_connection": {
          setRoom(data.body.room)
          setID(data.body.id)

          setInterval(() => {
            SendWSMessage(ws, {
              code: "user_count",
              body: {}
            })
          },10000)
          break;
        }
        case "new_message": {
          setMessages([...getMessages, data.body])
          const pingSound: any = document.getElementById('pingSound')
          if (pingSound && !document.hasFocus()) pingSound.play();
          break;
        }
        case "sent_message": {
          setMessages([...getMessages, data.body])
          break;
        }
        case "changed_room": {
          setMessages([])
          break;
        }
        case "user_count": {
          setUserCount(data.body.users)
          break;
        }
      }
    };
  }

  var scene;
  if (getScene === "welcome") scene = <Welcome setRoom={setRoom} setUsername={setUsername} connect={() => { SendWSMessage(ws, { code: "change_room", body: { room: getRoom } }); setScene('chat') }}></Welcome>;
  else if (getID) scene = <Chat messages={getMessages} userCount={getUserCount} username={getUsername} setScene={setScene} createMessage={(msg) => SendWSMessage(ws, { code: "send_message", body: { author: getUsername, message: msg } })}></Chat>

  return (
    <div className="App">
      <header className="App-header">
        <div className="messagePanel">
          {scene}
        </div>
      </header>
    </div>
  );
}

export default App;

function SendWSMessage (ws: WebSocket, data: IWebsocketClientData) {
  ws.send(JSON.stringify(data))
}