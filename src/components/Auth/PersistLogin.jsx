import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshToken } from "../../api/authApi";
import jwtDecode from "jwt-decode";
import { authSliceActions } from "../../features/auth/authSlice";
import { Outlet } from "react-router-dom";
import qs from 'qs'
import {useEffect, useState} from "react";

const PersistLogin = () => {
  const [IsLoading, setIsLoading] = useState(true);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        const response = await refreshToken();
        const token = response.data.access_token;
        const decoded = jwtDecode(token);
        dispatch(
          authSliceActions.setCredentials({
            pengguna: decoded.pengguna,
            access_token: token,
          })
        );
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    !auth?.token ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  useEffect(() => {
    console.log(`IsLoading : ${IsLoading}`);
    console.log(`AccessToken : ${auth.token}`);
    console.log(`Pengguna : ${qs.stringify(auth.pengguna)}`);
  }, [IsLoading]);

  return <>{IsLoading ? <></> : <Outlet />}</>;
};

export default PersistLogin;
