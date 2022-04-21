import React, { useState } from 'react';
import { RoomNameRegex, UsernameRegex } from '../../utility/regex';
import Button from '../button';
import TextBox from '../textbox';
import './welcome.css';

function Welcome(props: {setUsername: (username: string) => void, setRoom: (room: string) => void, connect: () => void}) {
  return (
    <>
      <h1 id='welcomeText'>Welcome to</h1>
      <h1 id='welcomeTextName'>TMCC</h1>
      <TextBox id="username-textbox" name="Username" infoText="(Max length 30)" placeholder="Enter a username..." maxLength={30} onChange={(e) => {if (UsernameRegex.test(e.target.value)) props.setUsername(e.target.value) }}></TextBox>
      <TextBox id="room-textbox" name="Room" infoText="(Max length 30)" placeholder="Enter a room name..." maxLength={30} onChange={(e) => {if (RoomNameRegex.test(e.target.value)) props.setRoom(e.target.value) }}></TextBox>
      <Button id="welcome-button" name="Connect" onClick={props.connect}></Button>
    </>
  );
}

export default Welcome;
