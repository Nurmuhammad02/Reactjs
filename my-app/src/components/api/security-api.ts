import {instance} from "./api.ts";

type GetCaptchaURLResponseType = {
    url: string
}

export const securityApi = {
    getCaptchaURL() {
        return instance.get<GetCaptchaURLResponseType>(`/security/get-captcha-url`).then(res => res.data)
    },
}







