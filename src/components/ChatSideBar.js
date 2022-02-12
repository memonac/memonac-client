import React, { useRef, useState, useEffect } from "react";

import styled from "styled-components";
import PropTypes from "prop-types";

import ChatLine from "./ChatLine";
import TextInput from "./TextInput";
import Button from "./Button";

const ChatSideBarContainer = styled.div`
  position: absolute;
  left: ${(props) => (props.isOpen ? 5 : -400)}px;
  z-index: 1;
  width: 300px;
  padding: 10px;
  transition: 1s;
  background-color: #f5e6ca;

  .chat-list-container {
    height: 500px;
    overflow-y: scroll;
  }
`;

function ChatSideBar({ onSubmitInputText, chatList, isOpen, currentUserId }) {
  const scrollRef = useRef();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatList]);

  return (
    <ChatSideBarContainer isOpen={isOpen}>
      <div className="chat-list-container" ref={scrollRef}>
        <div>
          <span>sadf</span>
        </div>
        {chatList.map(({ user, message, sendDate }) => {
          return (
            <ChatLine
              key={sendDate}
              userName={user.name}
              comment={message}
              date={sendDate}
              isMine={currentUserId === user.id}
            />
          );
        })}
      </div>
      <div>
        <form onSubmit={onSubmitInputText}>
          <TextInput typd="text" name="message" width={200} />
          <Button text="보내기" />
        </form>
      </div>
    </ChatSideBarContainer>
  );
}

ChatSideBar.propTypes = {
  onSubmitInputText: PropTypes.func.isRequired,
  chatList: PropTypes.array.isRequired,
  isOpen: PropTypes.bool.isRequired,
  currentUserId: PropTypes.string.isRequired,
};

export default ChatSideBar;
