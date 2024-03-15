import {instance} from "./api.ts";


export const profileApi = {
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