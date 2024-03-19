import * as buffer from "buffer";
import {AppStateType} from "../redux/redux-store.ts";

export type DialogsType = {
    id: number,
    name: string
}

export type MessagesType = {
    id: number,
    message: string
}

export type PostsType = {
    id: number,
    message: string,
    likesCount: number
}

export type PhotosType = {
    small: string | null
    large: string | null
}


export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

export type UserType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean
}

export type ProfileType = {
    contacts: ContactsType
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    photos: PhotosType
    userId: number
}

type ServerResponseType<D> = {
    errorCode: number
    messages: Array<string>
    data: D
}

const response2: ServerResponseType<UserType> = {
    errorCode: 1,
    messages: ["some", "array"],
    data: {
        id: 1,
        name: "Nurik",
        status: "string",
        photos: {
            small: '21',
            large: "213"
        },
        followed: true,
    }
}
const response1: ServerResponseType<PhotosType> = {
    errorCode: 1,
    messages: ["some", "array"],
    data: {
        small: '21',
        large: "213"
    }
}



