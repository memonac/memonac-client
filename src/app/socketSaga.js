import { eventChannel } from "redux-saga";
import { take, call, put } from "redux-saga/effects";
import io from "socket.io-client";
import { receiveMessage } from "../features/memoroom/memoRoomSlice";

const chatSocket = io(`${process.env.REACT_APP_SERVER_URI}/chat`);

// 메모관련 socket namespace
// const memoSocket = io(`${process.env.REACT_APP_SERVER_URI}/memo`);

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
          date: date,
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

export function* chatSocketSaga() {
  const chatChannel = yield call(createChatSocketChannel, chatSocket);

  while (true) {
    const action = yield take(chatChannel);
    yield put(action);
  }
}

const memoRoomSocket = {
  join(userId, userName, memoRoomId) {
    // 메모룸 입장시 서버로 요쳥
    chatSocket.emit("join room", userId, userName, memoRoomId);
  },
  leave(memoRoomId) {
    // 메모륨 퇴장
    chatSocket.emit("leave room", memoRoomId);
  },
  sendMessage(message, date) {
    // 메세지 보내기
    chatSocket.emit("send message", message, date);
  },
};

export { memoRoomSocket };
