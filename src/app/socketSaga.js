import { eventChannel } from "redux-saga";
import { take, call, put } from "redux-saga/effects";
import io from "socket.io-client";
import {
  receiveMessage,
  updateMemoLocation,
} from "../features/memoroom/memoRoomSlice";

const chatSocket = io(`${process.env.REACT_APP_SERVER_URI}/chat`);

// 메모관련 socket namespace
const memoSocket = io(`${process.env.REACT_APP_SERVER_URI}/memo`);

function createChatSocketChannel(socket) {
  return eventChannel((emit) => {
    socket.on("connect", () => {
      // 서버 연결 체크용
    });

    socket.on("join room", (userName) => {
      // 누군가 내가 들어왔을때 토스트 알림
    });

    socket.on("receive message", (userId, userName, message, date) => {
      emit(
        receiveMessage({
          user: { id: userId, name: userName },
          message,
          date: new Date(date),
        })
      );
    });

    return () => {
      socket.off("join room");
      socket.off("receive message");
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

// ===============================================

function createMemoLocationSocketChannel(socket) {
  return eventChannel((emit) => {
    socket.on("connect", () => {
      // 서버 연결 체크용
    });

    socket.on("join room", (userName) => {
      // 누군가 내가 들어왔을때 토스트 알림
    });

    socket.on("receive updated location", (memoId, left, top) => {
      emit(
        updateMemoLocation({
          memoId,
          left,
          top,
        })
      );
    });

    return () => {
      socket.off("join room");
      socket.off("receive updated location");
    };
  });
}

export function* memoLocationSocketSaga() {
  const memoLocationChannel = yield call(
    createMemoLocationSocketChannel,
    memoSocket
  );

  while (true) {
    const action = yield take(memoLocationChannel);
    yield put(action);
  }
}

const memoRoomSocket = {
  join(userId, userName, memoRoomId) {
    // 메모룸 입장시 서버로 요쳥
    chatSocket.emit("join room", userId, userName, memoRoomId);
    memoSocket.emit("join room", userId, userName, memoRoomId);
  },
  leave(memoRoomId) {
    // 메모륨 퇴장
    chatSocket.emit("leave room", memoRoomId);
    memoSocket.emit("leave room", memoRoomId);
  },
  sendMessage(message, date) {
    // 메세지 보내기
    chatSocket.emit("send message", message, date);
  },
  updateMemoLocation(memoId, left, top) {
    // 업데이트 된 메모 위치 보내기
    memoSocket.emit("send updated location", memoId, left, top);
  },
};

export { memoRoomSocket };
