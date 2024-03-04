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
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
    },
    getUsersProfile(userId) {
        console.log('It gets from profileAPI');
        return profileAPI.getUsersProfile(userId);
    },
    follow(userId) {
        return instance.post(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`)
    },
    unfollow(userId) {
        return instance.delete(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`)
    },
}

export const profileAPI = {
    getUsersProfile(userId) {
        return instance.get(`profile/` + userId)
    },
    getStatusProfile(userId) {
        return instance.get(`/profile/status/` + userId)

    },
    updateStatusProfile(status) {
        return instance.put(`/profile/status/`, {status})
    },
}
export const authAPI = {
    me() {
        return instance.get(`auth/me`)
    },
    logIn(email, password, rememberMe = false) {
        return instance.post(`auth/login`, {email, password, rememberMe})
    },
    logOut() {
        return instance.delete(`auth/login`)
    },

}







