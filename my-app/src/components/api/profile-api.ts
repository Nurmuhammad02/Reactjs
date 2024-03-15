import {instance} from "./api.ts";
import {ProfileType} from "../../Types/types.ts";


export const profileApi = {
    getUsersProfile(userId: number) {
        return instance.get<ProfileType>(`profile/` + userId)
    },
    getStatusProfile(userId: number) {
        return instance.get(`/profile/status/` + userId)
    },
    updateStatusProfile(status: string) {
        return instance.put(`/profile/status/`, {status})
    },
}