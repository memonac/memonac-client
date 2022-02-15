import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import PropTypes from "prop-types";

import Button from "./Button";
import { addAudioFileRequest } from "../features/memoroom/memoRoomSlice";

const AudioWrapper = styled.div`
  audio {
    width: 190px;
  }
`;

function AudioRecord({ userId, memoroomId, memoId }) {
  const [stream, setStream] = useState("");
  const [media, setMedia] = useState("");
  const [onRec, setOnRec] = useState(true);
  const [source, setSource] = useState("");
  const [analyser, setAnalyser] = useState("");
  const [audioUrl, setAudioUrl] = useState("");

  const dispatch = useDispatch();

  const updatedMemo = useSelector((state) => state.memoRoom.memos)[memoId];

  function onRecAudio() {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioCtx.createScriptProcessor(0, 1, 1);

    setAnalyser(analyser);

    function makeSound(stream) {
      const source = audioCtx.createMediaStreamSource(stream);

      setSource(source);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
    }

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      setStream(stream);
      setMedia(mediaRecorder);
      makeSound(stream);

      analyser.onaudioprocess = function (event) {
        if (event.playbackTime > 180) {
          stream.getAudioTracks().forEach(function (track) {
            track.stop();
          });
          mediaRecorder.stop();

          analyser.disconnect();
          audioCtx.createMediaStreamSource(stream).disconnect();

          mediaRecorder.ondataavailable = function (event) {
            setAudioUrl(event.data);
            setOnRec(true);
          };
        } else {
          setOnRec(false);
        }
      };
    });
  }

  function offRecAudio() {
    media.ondataavailable = function (event) {
      setAudioUrl(event.data);
      setOnRec(true);
    };

    stream.getAudioTracks().forEach(function (track) {
      track.stop();
    });

    media.stop();

    analyser.disconnect();
    source.disconnect();
  }

  const onSubmitAudioFile = useCallback(() => {
    const sound = new File([audioUrl], "mp3", {
      lastModified: new Date().getTime(),
      type: "audio/mpeg",
    });

    const formData = new FormData();
    formData.append("audio", sound);

    dispatch(addAudioFileRequest({ userId, memoroomId, memoId, formData }));
  }, [audioUrl]);

  return (
    <AudioWrapper>
      {updatedMemo.content && (
        <audio controls>
          <source src={updatedMemo.content} />
        </audio>
      )}
      {!updatedMemo.content && (
        <>
          <Button
            text={onRec ? "RECORD" : "STOP"}
            width={80}
            color={onRec ? "#3E497A" : "#f03c3c"}
            onClick={onRec ? onRecAudio : offRecAudio}
          />
          <Button
            text="SAVE"
            width={80}
            color="#3E497A"
            onClick={onSubmitAudioFile}
          />
        </>
      )}
    </AudioWrapper>
  );
}

AudioRecord.prototypes = {
  userId: PropTypes.string.isRequired,
  memoroomId: PropTypes.string.isRequired,
  memoId: PropTypes.string.isRequired,
};

export default AudioRecord;
