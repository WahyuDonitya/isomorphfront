import axios from "axios";
import qs from "qs";
import axiosPrivate from "./axiosPrivate";

export const getAllKategori = async () => {
    const response = await axiosPrivate.get("/kategori");
    return !response?.data ? [] : response.data;
};

export const getAllMovie = async () => {
    const response = await axiosPrivate.get("/movie");
    return !response?.data ? [] : response.data;
};

export const postMovie = async (data) => {
    // kalau mau pakai JSON AJA
    // const response = await movieApi.post("/movie", data);

    // kalau mau pakai x-www-form-encoded
    const response = await axiosPrivate.post("/movie", qs.stringify(data), {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });
    return response;
};

export const deleteMovie = async (data) => {
    const response = await axiosPrivate.delete("/movie/" + data);
    return response;
};
