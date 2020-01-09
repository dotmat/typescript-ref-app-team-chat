import React, { ReactNode } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { UserInitialsAvatar } from "foundations/components/UserInitialsAvatar";
import convertTimestampToTime from "foundations/utilities/convertTimestampToTime";
import {
  Wrapper,
  Body,
  Header,
  Avatar,
  SenderName,
  Content,
  TimeSent
} from "./Message.style";

export interface MessageFragment {
  sender: {
    id: string;
    name: string;
  };
  timetoken: string;
  message: {
    content: any;
  };
}

interface MessageProps {
  message: MessageFragment;
  avatar?: ReactNode;
}

const Message = ({ message, avatar }: MessageProps) => {
  // show unknown sender when sender is missing
  let sender = message.sender || { id: "unknown", name: "Unknown" };
  var contentObject = null;

  // If the message is a type of text message, just display the text.
  if(message.message.content.type === 'text'){
    contentObject = <div>{message.message.content.body}</div>
  }

  // If the message is a type of image, it might have a thumbnail attached, if it does show the thumbnail, if not show the file name and let the user open a new tab to the image
  if(message.message.content.type === 'image'){
    if(message.message.content.thumbnail){
      contentObject = <div><a target={"_blank"} href={message.message.content.url}><img alt={message.message.content.url} width="100%" src={message.message.content.thumbnail} /></a></div>
    } else {
      contentObject = <div><a target={"_blank"} href={message.message.content.url}><img alt={message.message.content.url} width="100%" src={message.message.content.url} /></a></div>
    }
  }

  if(message.message.content.type === 'document'){
    contentObject = <div><a target={"_blank"} href={message.message.content.url}>{message.message.content.body}</a></div>
  }
  
  // Configure the sender Object
  var senderObject = <Dropdown><Dropdown.Toggle variant="secondary" id="dropdown-basic" size="sm">{sender.name}</Dropdown.Toggle><Dropdown.Menu><Dropdown.Item>Boss</Dropdown.Item><Dropdown.Divider /><Dropdown.Item href="#/action-1">Message</Dropdown.Item><Dropdown.Divider /><Dropdown.Item href="#/action-1">Block</Dropdown.Item><Dropdown.Item href="#/action-1">Report</Dropdown.Item></Dropdown.Menu></Dropdown>


  return (
    <Wrapper>
      <Avatar>
        {avatar ? (avatar) : (<UserInitialsAvatar size={36} name={sender.name} uuid={sender.id} />)}
      </Avatar>
      <Body>
        <Header>
          <SenderName>{senderObject}</SenderName>
          <TimeSent>{convertTimestampToTime(message.timetoken)}</TimeSent>
        </Header>
        {/* <Content>{message.message.content.body}</Content> */}
        {/* <Content>{message.message.content.type == 'image' && message.message.content.thumbnail? <div>Image File</div>:<div>Not Image</div>}</Content> */}
        <Content>{contentObject}</Content>
      </Body>
    </Wrapper>
  );
};

export { Message };
