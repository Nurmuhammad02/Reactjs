import {actions, follow} from "./users-reducer.ts";
import {usersApi} from "../components/api/users-api.ts";
import {ResponseType, ResultCodesEnum} from "../components/api/api.ts";

jest.mock("../components/api/users-api.ts")
const userApiMock = usersApi as jest.Mocked<typeof usersApi>;

const result: ResponseType = {
    resultCode: ResultCodesEnum.Success,
    messages: [],
    data: {}
}


// After the mock return value is set up
userApiMock.follow.mockReturnValue(Promise.resolve(result));

test("", () => {
    const thunk = follow(1)
    const dispatchMock = jest.fn()

    // @ts-ignore
    thunk(dispatchMock)

    expect(dispatchMock).toBeCalledTimes(1)
    expect(dispatchMock).toHaveBeenCalledWith(1, actions.toggleFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenCalledWith(2, actions.succesFollow(1))
    expect(dispatchMock).toHaveBeenCalledWith(3, actions.toggleFollowingProgress(false, 1))
})