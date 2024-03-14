import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "59959f94-16a5-4aa1-8ae9-5ecb6f8d2135"
    }
})

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
    },
    getUsersProfile(userId: number) {
        return profileAPI.getUsersProfile(userId);
    },
    follow(userId: number) {
        return instance.post(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`)
    },
    unfollow(userId: number) {
        return instance.delete(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`)
    },
}

export const profileAPI = {
    getUsersProfile(userId: number) {
        return instance.get(`profile/` + userId)
    },
    getStatusProfile(userId: number) {
        return instance.get(`/profile/status/` + userId)

    },
    updateStatusProfile(status: string) {
        return instance.put(`/profile/status/`, {status})
    },
}

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}
export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
}

type MeResponseType = {
    data: { id: number, email: string, login: string }
    resultCode: ResultCodesEnum
    messages: string[]
}
type LoginResponseType = {
    data: { userId: number }
    resultCode: ResultCodesEnum | ResultCodeForCaptcha
    messages: string[]
}
export const authAPI = {
    me() {
        return instance.get<MeResponseType>(`auth/me`).then(res => res.data)
    },
    logIn(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<LoginResponseType>(`auth/login`, {email, password, rememberMe, captcha}).then(res => res.data)
    },
    logOut() {
        return instance.delete(`auth/login`)
    },
}

export const securityAPI = {
    getCaptchaURL() {
        return instance.get(`/security/get-captcha-url`)
    },
}







