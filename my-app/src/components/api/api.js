import axios from "axios";


const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "59959f94-16a5-4aa1-8ae9-5ecb6f8d2135"
    }
})

const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`, {
            withCredentials: true
        })
            .then(res => {
                return res.data;
            })
    },
    getLogin() {
        return instance.get(`auth/me`, {
            withCredentials: true
        })
            .then(res => {
                return res.data;
            })
    },
    getUsersProfile(userId) {
        return instance.get(`profile/` + userId)
            .then(res => {
                return res.data;
            })
    }
}

export default usersAPI;



