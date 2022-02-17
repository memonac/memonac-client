const SOCKET_NAMESPACE = {
  chat: "/chat",
  memo: "/memo",
};

const SOCKET_EVENT = {
  joinRoom: "join room",
  leaveRoom: "leave room",
  sendMessage: "send message",
  receiveMessage: "receive message",
  withdrawRoom: "withdraw room",
  updateParticipants: "update participants",
  memoLocation: "memo/location",
  memoDelete: "memo/delete",
  memoSize: "memo/size",
  memoText: "memo/text",
  memoStyle: "memo/style",
  memoAdd: "memo/add",
  memoAudio: "memo/audio",
};

export { SOCKET_NAMESPACE, SOCKET_EVENT };
