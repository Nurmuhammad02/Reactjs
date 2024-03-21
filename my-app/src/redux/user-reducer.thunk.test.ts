import {follow} from "./users-reducer.ts";

test("", () => {
    const thunk = follow(1)
    const dispatchMock = jest.fn()

    // @ts-ignore
    thunk(dispatchMock)

    expect(dispatchMock).toBeCalledTimes(3)
})