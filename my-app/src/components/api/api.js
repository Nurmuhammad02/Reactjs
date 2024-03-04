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
export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(constThen)
    },
    getUsersProfile(userId) {
        console.log('It gets from profileAPI');
        return profileAPI.getUsersProfile(userId);
    },
    follow(userId) {
        return instance.post(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`).then(constThen)
    },
    unfollow(userId) {
        return instance.delete(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`).then(constThen)
    },
}

export const profileAPI = {
    getUsersProfile(userId) {
        return instance.get(`profile/` + userId).then(constThen)
    },
    getStatusProfile(userId) {
        return instance.get(`/profile/status/` + userId).then(constThen)

    },
    updateStatusProfile(status) {
        return instance.put(`/profile/status/`, {status}).then(constThen)
    },
}
export const authAPI = {
    me() {
        return instance.get(`auth/me`).then(constThen)
    },
    logIn(email, password, rememberMe = false) {
        return instance.post(`auth/login`, {email, password, rememberMe}).then(constThen)
    },
    logOut() {
        return instance.delete(`auth/login`).then(constThen)
    },

}







