import axios from "./axiosInstance";

const userApi = {};

userApi.getlogin = async (token) => {
  const response = await axios.get(
    "/login",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    },
  );

  return response.data;
};

userApi.postsignup = async ({ token, email, name }) => {
  const response = await axios.post(
    "/signup",
    {
      email,
      name,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    },
  );

  return response.data;
};

userApi.getlogout = async () => {
  const response = await axios.get("/logout", {
    withCredentials: true,
  });

  return response.data;
};

export default userApi;
