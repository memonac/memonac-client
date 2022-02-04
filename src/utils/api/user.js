import axios from "axios";

const userApi = {};

userApi.getlogin = async (token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const response = await axios.get(
    "/login",
    headers,
    { withCredentials: true }
  );

  return response;
};

userApi.getlogout = async () => {
  const response = await axios.get(
    "/logout",
    { withCredentials: true }
  );

  return response;
};

export default userApi;
