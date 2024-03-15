import {instance} from "./api.ts";

export const securityApi = {
    getCaptchaURL() {
        return instance.get(`/security/get-captcha-url`)
    },
}







