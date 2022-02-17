import axios from "./axiosInstance";

const userApi = {};

userApi.getLogin = async (token) => {
  const response = await axios.get("/login", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });

  return response.data;
};

userApi.postSignup = async ({ token, email, name }) => {
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
    }
  );

  return response.data;
};

userApi.getLogout = async () => {
  const response = await axios.get("/logout", {
    withCredentials: true,
  });

  return response.data;
};

export default userApi;
