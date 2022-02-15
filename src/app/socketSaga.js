import { eventChannel } from "redux-saga";
import { take, call, put } from "redux-saga/effects";
import io from "socket.io-client";
import {
  receiveMessage,
  updateMemoLocation,
  removeMemo,
  updateMemoSize,
  updateMemoText,
  addNewMemoSuccess,
  addAudioFileSuccess,
} from "../features/memoroom/memoRoomSlice";

const chatSocket = io(`${process.env.REACT_APP_SERVER_URI}/chat`);
const memoSocket = io(`${process.env.REACT_APP_SERVER_URI}/memo`);

function createChatSocketChannel(socket) {
  return eventChannel((emit) => {
    socket.on("connect", () => {
      // 서버 연결 체크용
    });

    socket.on("join room", (userName) => {
      // 누군가 내가 들어왔을때 토스트 알림
    });

    socket.on("receive message", (userId, userName, message, date, id) => {
      emit(
        receiveMessage({
          user: { id: userId, name: userName },
          message,
          date,
          id,
        })
      );
    });

    return () => {
      socket.off("join room");
      socket.off("receive message");
    };
  });
}

function createMemoSocketChannel(socket) {
  return eventChannel((emit) => {
    socket.on("connect", () => {
      // 서버 연결 체크용
    });

    socket.on("join room", (userName) => {
      // 누군가 내가 들어왔을때 토스트 알림
    });

    socket.on("memo/location", (memoId, left, top) => {
      emit(
        updateMemoLocation({
          memoId,
          left,
          top,
        })
      );
    });

    socket.on("memo/delete", (memoId) => {
      emit(
        removeMemo({
          memoId,
        })
      );
    });

    socket.on("memo/size", (memoId, width, height) => {
      emit(
        updateMemoSize({
          memoId,
          width,
          height,
        })
      );
    });

    socket.on("memo/text", (memoId, text) => {
      emit(
        updateMemoText({
          memoId,
          text,
        })
      );
    });

    socket.on("memo/add", (newMemo) => {
      console.log("다른 사용자의 메모가 추가 되었다.");
      emit(addNewMemoSuccess(newMemo));
    });

    socket.on("memo/audio", (memoId, audioUrl) => {
      emit(
        addAudioFileSuccess({
          memoId,
          audioUrl,
        })
      );
    });

    return () => {
      socket.off("join room");
      socket.off("memo/location");
      socket.off("memo/delete");
      socket.off("memo/size");
      socket.off("memo/text");
      socket.off("memo/add");
      socket.off("memo/audio");
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
    chatSocket.emit("join room", userId, userName, memoRoomId);
    memoSocket.emit("join room", userId, userName, memoRoomId);
  },
  leave(memoRoomId) {
    chatSocket.emit("leave room", memoRoomId);
    memoSocket.emit("leave room", memoRoomId);
  },
  sendMessage(message, date) {
    chatSocket.emit("send message", message, date);
  },
  updateMemoLocation(memoId, left, top) {
    memoSocket.emit("memo/location", memoId, left, top);
  },
  deleteMemo(memoId) {
    memoSocket.emit("memo/delete", memoId);
  },
  updateMemoSize(memoId, width, height) {
    memoSocket.emit("memo/size", memoId, width, height);
  },
  updateMemoText(memoId, text) {
    memoSocket.emit("memo/text", memoId, text);
  },
  addMemo(newMemo) {
    memoSocket.emit("memo/add", newMemo);
  },
  updateMemoAudio({ memoId, audioUrl }) {
    memoSocket.emit("memo/audio", memoId, audioUrl);
  },
};

export { memoRoomSocket };
