import {actions} from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';
import {connect} from 'react-redux';
import {AppStateType} from "../../../redux/redux-store.ts";


const mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.posts,
    }
}

type MapDispatchToPropsType = {
    addPost: (text: string) => void
}

// const mapDispatchToProps = (dispatch: any): MapDispatchToPropsType => {
//     return {
//         addPost: (text: string) => {
//             dispatch(actions.addPostActionCreator(text));
//         },
//     }
// }

//@ts-ignore
const MyPostsContainer = connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {
    addPost: actions.addPostActionCreator
})(MyPosts);

export default MyPostsContainer;