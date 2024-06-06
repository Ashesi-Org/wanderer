import axios from "axios";

export const api = axios.create({
    baseURL: process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_PROD_API_URL : process.env.NEXT_PUBLIC_DEV_API_URL,
    withCredentials: true,
})