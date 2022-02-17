import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";

import { getChatListRequest } from "../features/memoroom/memoRoomSlice";

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

function ChatSideBar({
  onSubmitInputText,
  chatList,
  isOpen,
  currentUserId,
  currentMemoRoomId,
  chatLastIndex,
}) {
  const scrollRef = useRef();
  const targetRef = useRef();

  const userId = useSelector((state) => state.auth.id);

  const dispatch = useDispatch();

  const defaultOption = {
    threshold: 1,
    root: scrollRef.current,
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollTop + 1500;
    }
  }, [chatList]);

  useEffect(() => {
    function callback(entries) {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          scrollRef.current.scrollTop === 0 &&
          scrollRef.current.scrollHeight !== 500
        ) {
          dispatch(
            getChatListRequest({
              userId,
              memoroomId: currentMemoRoomId,
              chatLastIndex,
            })
          );
        }
      });
    }

    const targetElement = targetRef.current;
    let observer;

    if (targetRef) {
      observer = new IntersectionObserver(callback, defaultOption);
      observer.observe(targetElement);
    }

    if (!chatLastIndex) {
      observer.unobserve(targetElement);
    }

    return () => observer?.disconnect(targetElement);
  }, [chatLastIndex]);

  return (
    <ChatSideBarContainer isOpen={isOpen}>
      <div className="chat-list-container" ref={scrollRef}>
        <div ref={targetRef}></div>
        {chatList.map(({ user, message, sendDate, _id }) => {
          return (
            <ChatLine
              key={_id}
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
          <Button text="SEND" />
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
  currentMemoRoomId: PropTypes.string.isRequired,
};

export default ChatSideBar;
