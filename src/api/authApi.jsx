import axios from "axios";
import jwtDecode from "jwt-decode";
import qs from "qs";
import { useDispatch } from "react-redux";
import { authSliceActions } from "../features/auth/authSlice";

const authApi = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

export const register = async (data) => {
  const response = await authApi.post("/auth/register", qs.stringify(data));
  return response;
};

export const login = async (data) => {
  const response = await authApi.post("/auth/login", qs.stringify(data), {
    withCredentials: true,
  });
  return response;
};

export const refreshToken = async (data) => {
  console.log("Refreshing");
  const response = await authApi.get("/auth/refreshToken", {
    withCredentials: true,
  });
  return response;
};

export const logout = async (data) => {
  console.log("Sign out");
  const response = await authApi.get("/auth/logout", {
    withCredentials: true,
  });
  return response;
};
