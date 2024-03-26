import {actions, followThunk, unfollowThunk} from "./users-reducer.ts";
import {usersApi} from "../components/api/users-api.ts";
import {ResponseType, ResultCodesEnum} from "../components/api/api.ts";

jest.mock("../components/api/users-api.ts")
const userApiMock = usersApi as jest.Mocked<typeof usersApi>;

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

beforeEach(() => {
    dispatchMock.mockClear();
    getStateMock.mockClear();
    userApiMock.follow.mockClear();
    userApiMock.unfollow.mockClear();

})

const result: ResponseType = {
    resultCode: ResultCodesEnum.Success,
    messages: [],
    data: {}
}


// After the mock return value is set up
userApiMock.follow.mockReturnValue(Promise.resolve(result));

test("",  async () => {
    const thunk = unfollowThunk(1);



    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(1)
    expect(dispatchMock).toHaveBeenCalledWith(1, actions.toggleFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenCalledWith(2, actions.succesUnfollow(1))
    expect(dispatchMock).toHaveBeenCalledWith(3, actions.toggleFollowingProgress(false, 1))
})