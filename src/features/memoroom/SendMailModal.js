import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import { postSendMailRequest } from "./memoRoomSlice";

import Button from "../../components/Button";
import ModalContainer from "../../components/Modal";
import TextInput from "../../components/TextInput";

import { MESSAGE } from "../../constants/response";

function SendMailModal({ isOpen, setIsOpen }) {
  const [message, setMessage] = useState("");

  const userId = useSelector((state) => state.auth.id);
  const sendMailError = useSelector((state) => state.memoRoom.sendMailError);
  const sendMailSuccess = useSelector(
    (state) => state.memoRoom.sendMailSuccess
  );
  const participants = useSelector((state) => state.memoRoom.participants);

  const { memoroomId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (sendMailError) {
      setMessage(`❗️ ${sendMailError}`);
    }

    if (sendMailSuccess) {
      setMessage(MESSAGE.successToSendMail);
    }

    return () => setMessage("");
  }, [sendMailError, sendMailSuccess]);

  function handleInvitationMailSubmit(event) {
    event.preventDefault();

    const { email } = event.target;
    const isParticipant = Object.entries(participants).filter(([id, data]) => {
      return email.value === data.email;
    });

    if (!isParticipant.length) {
      dispatch(postSendMailRequest({ userId, memoroomId, email: email.value }));

      return;
    }

    setMessage(MESSAGE.alreadyParticipatedMember);
  }

  return (
    <ModalContainer
      isOpen={isOpen}
      title="Invite Your Friends!"
      onClose={setIsOpen}
    >
      <div className="notification">
        ☝🏻 Only registered users can be invited.
      </div>
      <form onSubmit={handleInvitationMailSubmit}>
        <TextInput
          type="email"
          name="email"
          placeholder="Please Enter Email"
          width={200}
        />
        <Button text="SEND" width={100} />
      </form>
      <div>{message}</div>
    </ModalContainer>
  );
}

SendMailModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default SendMailModal;
