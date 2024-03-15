import {instance, ResponseType, ResultCodeForCaptcha, ResultCodesEnum} from "./api.ts";

type MeResponseDataType = {
    id: number
    email: string
    login: string
}

type LoginResponseDataType = {
    userId: number
}
export const authApi = {
    me() {
        return instance.get<ResponseType<MeResponseDataType>>(`auth/me`).then(res => res.data)
    },
    logIn(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<ResponseType<LoginResponseDataType, ResultCodesEnum | ResultCodeForCaptcha>>(`auth/login`, {
            email,
            password,
            rememberMe,
            captcha
        }).then(res => res.data)
    },
    logOut() {
        return instance.delete(`auth/login`)
    },
}