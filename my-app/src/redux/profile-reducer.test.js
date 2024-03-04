import profileReducer, {addPostActionCreator, deletePost} from "./profile-reducer";


//1. test data
let state = {
    posts: [
        {id: 1, message: 'werwerew', likesCount: 12},
        {id: 2, message: 'How is your friend?', likesCount: 11},
    ],
};

it("posts length is correct", () => {
    let action = addPostActionCreator("NURIK");

//2. test action
    let newState = profileReducer(state, action);

    //3. expextation

    expect(newState.posts.length).toBe(3)
});
it("message is correct", () => {
    let action = addPostActionCreator("NURIK");

//2. test action
    let newState = profileReducer(state, action);

    //3. expextation
    expect(newState.posts[2].message).toBe("NURIK")
});
it("deleted posts length is correct", () => {
    let action = deletePost(1)

//2. test action
    let newState = profileReducer(state, action);

    //3. expextation
    expect(newState.posts.length).toBe(2)
});


