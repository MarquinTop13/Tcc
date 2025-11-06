import axios from "axios"

const apiLink = axios.create({
    baseURL: "http://localhost:5010",
})

export default apiLink;