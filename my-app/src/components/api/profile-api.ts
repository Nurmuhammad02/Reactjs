import {instance, ResponseType} from "./api.ts";
import {ProfileType} from "../../Types/types.ts";


export const profileApi = {
    getUsersProfile(userId: number) {
        return instance.get<ProfileType>(`profile/` + userId).then(res => res.data)
    },
    getStatusProfile(userId: number) {
        return instance.get<string>(`/profile/status/` + userId).then(res => res.data)
    },
    updateStatusProfile(status: string) {
        return instance.put<ResponseType>(`/profile/status/`, {status}).then(res => res.data)
    },
}