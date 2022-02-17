const ERROR_NAME = {
  userNotFound: "auth/user-not-found",
  wrongPassword: "auth/wrong-password",
  tooManyRequests: "auth/too-many-requests",
  emailAlreadyInUse: "auth/email-already-in-use",
  expiredToken: "Expired Token",
};

const ERROR_MESSAGE = {
  firebaseTooManyRequest: "FirebaseError : too many requests",
  wrongPassword: "The password is incorrect",
  userNotFound: "The ID does not exist",
  passwordLengthVerification: "Password length cannot be less than 8",
  passwordNotMatch: "Passwords do not match",
  emailAlreadyInUse: "The ID that already exists",
  cannotSetTimeWithoutDate: "You cannot set only time without Date",
  cannotSetDateFasterThenNow: "Alarm Date cannot be faster then now",
  shoudUploadImageFile: "You should upload an image file",
};

const RESULT = {
  success: "success",
};

const MESSAGE = {
  successToSendMail: "Success to send mail 👍🏻 ",
  alreadyParticipatedMember: "❗️ Already participated member",
};

export { ERROR_NAME, ERROR_MESSAGE, RESULT, MESSAGE };
