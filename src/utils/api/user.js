import axios from "axios";

const userApi = {};

userApi.getlogin = async (token) => {
  const response = await axios.get(
    "http://localhost:8000/login",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    {
      withCredentials: true,
    }
  );

  return response.data;
};

userApi.postsignup = async ({ token, email, name }) => {
  const response = await axios.post(
    "http://localhost:8000/signup",
    {
      email,
      name,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    {
      withCredentials: true,
    }
  );

  return response.data;
};

userApi.getlogout = async () => {
  const response = await axios.get("http://localhost:8000/logout", {
    withCredentials: true,
  });

  return response.data;
};

export default userApi;
