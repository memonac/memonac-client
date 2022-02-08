import { eventChannel } from 'redux-saga';
import { take, call, put } from 'redux-saga/effects';
import io from 'socket.io-client';
// import { joinRoom } from "../memoroom/memoRoomSlice";

const socket = io(process.env.REACT_APP_SERVER_URI);

function createSocketChannel (socket) {
  return eventChannel((emit) => {
    socket.on("connect", () => {
      // 서버와 연결 체크
    });

    socket.on("join", (userId) => {
      // userId 가 입장 하였습니다.
      // 해당 액션은 아직 생성하지 않음
      // emit(addUser(user));
    });

    return () => {
      socket.off();
    };
  });
}

export function* socketSagas () {
  const channel = yield call(createSocketChannel, socket);

  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

const memoRoomSocket = {
  join(roomId) {
    // 메모룸 입장시 서버로 요쳥
    socket.emit("joinRoom", userId, roomId);
  },
};

export {
  memoRoomSocket,
};