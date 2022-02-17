import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { postSendMailRequest } from "./memoRoomSlice";

import Button from "../../components/Button";
import ModalContainer from "../../components/Modal";
import TextInput from "../../components/TextInput";

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
      setMessage("Success to send mail 👍🏻 ");
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

    setMessage("❗️ Already participated member");
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

export default SendMailModal;
