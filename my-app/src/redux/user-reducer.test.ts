import {UserType} from "../Types/types.ts";
import usersReducer, {InitialStateType, actions} from "./users-reducer.ts";

let state: InitialStateType;
beforeEach(() => {
    state = {
        users: [
            {id: 0, name: "Nurik", followed: true, photos: {small: "12312", large: "123123"}, status: "Unknown"},
            {
                id: 1,
                name: "Dymich",
                followed: false,
                photos: {small: "123123", large: "123123312321"},
                status: "Unknown"
            },
            {id: 2, name: "Alex", followed: true, photos: {small: "123213123", large: "123123"}, status: "Unknown"},
            {id: 3, name: "Nikita", followed: true, photos: {small: "12312", large: "123123"}, status: "Unknown"},
        ],
        pageSize: 5,
        totalUsersCount: 0,
        page: 1,
        isFetching: true,
        followingInProgress: [], //  Array of userid
        portionSize: 10,
        currentPage: 1,
        filter: {
            term: ""
        }
    }
})

test("", () => {


    const newState = usersReducer(state, actions.succesFollow(3))

    expect(newState.users[2].followed).toBeTruthy();
    expect(newState.users[3].followed).toBeFalsy();

})