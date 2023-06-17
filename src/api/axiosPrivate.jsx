import { authSliceActions } from "../features/auth/authSlice";
import jwtDecode from "jwt-decode";
import axios from "axios";
import store from "../store";
import { Navigate, useNavigate } from "react-router-dom";
import { logout } from "./authApi";

const baseURL = "http://localhost:3000/api/v1";
const axiosPrivate = axios.create({
    baseURL: baseURL,
});

axiosPrivate.interceptors.request.use(
    (config) => {
        const authorization_token = store.getState().auth.token;

        if (authorization_token) {
            config.headers.Authorization = `Bearer ${authorization_token}`;
        }

        return config;
    },
    (err) => Promise.reject(err)
);

axiosPrivate.interceptors.response.use(
    (response) => response,
    (error) => {
        const { dispatch } = store; // direct access to redux store.
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            return axios
                .get(baseURL + "/auth/refreshToken", {
                    withCredentials: true,
                })
                .then((response) => {
                    const token = response.data.access_token;
                    const decoded = jwtDecode(token);
                    dispatch(
                        authSliceActions.setCredentials({
                            pengguna: decoded.pengguna,
                            access_token: token,
                        })
                    );

                    // Update the original request with the new access token
                    originalRequest.headers.Authorization = `Bearer ${token}`;

                    // Retry the original request
                    return axiosPrivate(originalRequest);
                })
                .catch(async (error) => {
                    // Handle the refresh token error
                    console.error("error di axioos private");
                    // console.error(error);
                    const response = await logout();
                    dispatch(authSliceActions.logout());

                    // kita tidak bisa pakai usenavigate disini, karena bukan component atau hooks
                    window.location.href = "/login";
                });
        }

        // Return any other error response
        return Promise.reject(error);
    }
);

export default axiosPrivate;
