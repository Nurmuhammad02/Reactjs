import {actions} from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';
import {connect} from 'react-redux';
import {AppStateType} from "../../../redux/redux-store.ts";
import {PostsType} from "../../../Types/types.ts";

type MapStateToPropsType = {
    posts: PostsType[]
    newPostsText: string
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        posts: state.profilePage.posts,
        newPostsText: state.profilePage.newPostsText,
    }
}

type MapDispatchToPropsType = {
    addPost: (text: string) => void
}

const mapDispatchToProps = (dispatch: any): MapDispatchToPropsType => {
    return {
        addPost: (text: string) => {
            dispatch(actions.addPostActionCreator(text));
        },
    }
}

//@ts-ignore
const MyPostsContainer = connect<MapStateToPropsType, MapDispatchToPropsType>(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;