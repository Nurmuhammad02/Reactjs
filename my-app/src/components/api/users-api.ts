import {GetItemsType, instance, ResponseType} from "./api.ts";

export const usersApi = {
    getUsers(currentPage = 1, pageSize = 10, term: string = "", friend: null | boolean = null) {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${term}${friend === null ? "" : `&friend=${friend}`}`);
    },
    follow(userId: number) {
        return instance.post<ResponseType>(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`).then(res => res.data)
    },
    unfollow(userId: number) {
        return instance.delete(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`).then(res => res.data) as Promise<ResponseType>
    },
}








