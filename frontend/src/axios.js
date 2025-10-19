import axios from "axios"

const apiLink = axios.create({
    baseURL: "http://localhost:5010/api"
})

export default apiLink;