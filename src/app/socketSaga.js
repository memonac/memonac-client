import { eventChannel } from "redux-saga";
import { take, call, put } from "redux-saga/effects";
import io from "socket.io-client";
import {
  receiveMessage,
  updateMemoLocationSuccess,
  removeMemoSuccess,
  updateMemoSizeSuccess,
  updateMemoStyleSuccess,
  updateMemoTextSuccess,
  addNewMemoSuccess,
  leaveMemoRoomSuccess,
  postVerifyTokenSuccess,
  addAudioFileSuccess,
} from "../features/memoroom/memoRoomSlice";

import { SOCKET_NAMESPACE, SOCKET_EVENT } from "../constants/socket";

const chatSocket = io(
  `${process.env.REACT_APP_SERVER_URI}${SOCKET_NAMESPACE.chat}`
);
const memoSocket = io(
  `${process.env.REACT_APP_SERVER_URI}${SOCKET_NAMESPACE.memo}`
);

function createChatSocketChannel(socket) {
  return eventChannel((emit) => {
    socket.on(
      SOCKET_EVENT.receiveMessage,
      (userId, userName, message, date, id) => {
        emit(
          receiveMessage({
            user: { id: userId, name: userName },
            message,
            date,
            id,
          })
        );
      }
    );

    return () => {
      socket.off(SOCKET_EVENT.receiveMessage);
    };
  });
}

function createMemoSocketChannel(socket) {
  return eventChannel((emit) => {
    socket.on(SOCKET_EVENT.withdrawRoom, (userId) => {
      emit(leaveMemoRoomSuccess({ userId }));
    });

    socket.on(SOCKET_EVENT.updateParticipants, (participants, memoroomId) => {
      emit(postVerifyTokenSuccess({ participants, memoroomId }));
    });

    socket.on(SOCKET_EVENT.memoLocation, (memoId, left, top) => {
      emit(
        updateMemoLocationSuccess({
          memoId,
          left,
          top,
        })
      );
    });

    socket.on(SOCKET_EVENT.memoDelete, (memoId) => {
      emit(
        removeMemoSuccess({
          memoId,
        })
      );
    });

    socket.on(SOCKET_EVENT.memoSize, (memoId, width, height) => {
      emit(
        updateMemoSizeSuccess({
          memoId,
          width,
          height,
        })
      );
    });

    socket.on(SOCKET_EVENT.memoText, (memoId, text) => {
      emit(
        updateMemoTextSuccess({
          memoId,
          text,
        })
      );
    });

    socket.on(
      SOCKET_EVENT.memoStyle,
      (memoId, memoColor, alarmDate, memoTags) => {
        emit(
          updateMemoStyleSuccess({
            memoId,
            memoColor,
            alarmDate,
            memoTags,
          })
        );
      }
    );

    socket.on(SOCKET_EVENT.memoAdd, (newMemo) => {
      emit(addNewMemoSuccess(newMemo));
    });

    socket.on(SOCKET_EVENT.memoAudio, (memoId, audioUrl) => {
      emit(
        addAudioFileSuccess({
          memoId,
          audioUrl,
        })
      );
    });

    return () => {
      socket.off(SOCKET_EVENT.joinRoom);
      socket.off(SOCKET_EVENT.withdrawRoom);
      socket.off(SOCKET_EVENT.updateParticipants);
      socket.off(SOCKET_EVENT.memoLocation);
      socket.off(SOCKET_EVENT.memoDelete);
      socket.off(SOCKET_EVENT.memoSize);
      socket.off(SOCKET_EVENT.memoText);
      socket.off(SOCKET_EVENT.memoStyle);
      socket.off(SOCKET_EVENT.memoAdd);
      socket.off(SOCKET_EVENT.memoAudio);
    };
  });
}

export function* chatSocketSaga() {
  const chatChannel = yield call(createChatSocketChannel, chatSocket);

  while (true) {
    const action = yield take(chatChannel);
    yield put(action);
  }
}

export function* memoSocketSaga() {
  const memoChannel = yield call(createMemoSocketChannel, memoSocket);

  while (true) {
    const action = yield take(memoChannel);
    yield put(action);
  }
}

const memoRoomSocket = {
  join(userId, userName, memoRoomId) {
    chatSocket.emit(SOCKET_EVENT.joinRoom, userId, userName, memoRoomId);
    memoSocket.emit(SOCKET_EVENT.joinRoom, userId, userName, memoRoomId);
  },
  leave(memoRoomId) {
    chatSocket.emit(SOCKET_EVENT.leaveRoom, memoRoomId);
    memoSocket.emit(SOCKET_EVENT.leaveRoom, memoRoomId);
  },
  sendMessage(message, date) {
    chatSocket.emit(SOCKET_EVENT.sendMessage, message, date);
  },
  withdrawRoom(userId) {
    memoSocket.emit(SOCKET_EVENT.withdrawRoom, userId);
  },
  updateParticipants(participants, memoroomId) {
    memoSocket.emit(SOCKET_EVENT.updateParticipants, participants, memoroomId);
  },
  updateMemoLocation(memoId, left, top) {
    memoSocket.emit(SOCKET_EVENT.memoLocation, memoId, left, top);
  },
  deleteMemo(memoId) {
    memoSocket.emit(SOCKET_EVENT.memoDelete, memoId);
  },
  updateMemoSize(memoId, width, height) {
    memoSocket.emit(SOCKET_EVENT.memoSize, memoId, width, height);
  },
  updateMemoText(memoId, text) {
    memoSocket.emit(SOCKET_EVENT.memoText, memoId, text);
  },
  updateMemoStyle({ memoId, memoColor, alarmDate, memoTags }) {
    memoSocket.emit(
      SOCKET_EVENT.memoStyle,
      memoId,
      memoColor,
      alarmDate,
      memoTags
    );
  },
  addMemo(newMemo) {
    memoSocket.emit(SOCKET_EVENT.memoAdd, newMemo);
  },
  updateMemoAudio({ memoId, audioUrl }) {
    memoSocket.emit(SOCKET_EVENT.memoAudio, memoId, audioUrl);
  },
};

export { memoRoomSocket };
