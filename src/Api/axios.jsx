import axios from "axios"

const axiosInstance = axios.create({
    baseURL:"http://localhost:7777"
})

export {axiosInstance}


