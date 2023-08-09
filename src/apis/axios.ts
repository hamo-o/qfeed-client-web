import axios, { AxiosInstance } from "axios";

export const qFeedAxios: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
        "Content-Type": "application/json;charset=utf-8"
    }
});