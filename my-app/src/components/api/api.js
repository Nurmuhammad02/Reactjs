import axios from "axios";


const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "59959f94-16a5-4aa1-8ae9-5ecb6f8d2135"
    }
})

const constThen = (res) => {
    return res.data;
}

const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(constThen)
    },
    getLogin() {
        return instance.get(`auth/me`).then(constThen)
    },
    getUsersProfile(userId) {
        return instance.get(`profile/` + userId).then(constThen)
    },
    follow(userId) {
        return instance.post(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`).then(constThen)
    },
    unfollow(userId) {
        return instance.delete(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`).then(constThen)
    },
}

export default usersAPI;


