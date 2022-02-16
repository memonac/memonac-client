import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Profile from "./Profile";

const ChatLineContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: ${(props) => (props.isMine ? "flex-end" : "auto")};
  margin-top: 10px;

  p {
    margin: 0;
    font-size: 15px;
    text-align: ${(props) => (props.isMine ? "right" : "left")};
    word-break: break-all;
  }

  .wrapper {
    display: ${(props) => (props.isMine ? "flex" : "block")};
    flex-direction: column;
    align-items: flex-end;
  }

  .message {
    display: inline-block;
    margin-top: 5px;
    padding: 10px;
    border-radius: 10px;
    background-color: #ffffff;
  }

  .date {
    padding: 5px;
    font-size: 12px;
    text-align: right;
  }
`;

function ChatLine({ isMine, userName, comment, date }) {
  const name = isMine ? "나" : userName;
  const dateObj = new Date(date);

  return (
    <ChatLineContainer isMine={isMine}>
      {!isMine && (
        <div className="profile-wrapper">
          <Profile firstName={userName[0]} size={30} />
        </div>
      )}
      <div className="wrapper">
        <p className="">{name}</p>
        <p className="message">{comment}</p>
        <p className="date">{dateObj.toLocaleString()}</p>
      </div>
    </ChatLineContainer>
  );
}

ChatLine.propTypes = {
  isMine: PropTypes.bool.isRequired,
  userName: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default ChatLine;
