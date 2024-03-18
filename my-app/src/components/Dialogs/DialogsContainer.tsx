import Dialogs from './Dialogs';
import {actions, InitialStateType} from '../../redux/dialogs-reducer';
import {connect} from 'react-redux';
import {withAuthRedirect} from '../../hoc/withAuthRedirect.jsx';
import {AppStateType} from "../../redux/redux-store.ts";

type MapStateToPropsType = {
    dialogsPage: InitialStateType
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage,
    }
}


export default withAuthRedirect(connect(mapStateToProps, {
    // sendMessage: actions.sendMessage
    ...actions
})(Dialogs));


// let mapDispatchToProps = (dispatch) => {
//     return {
//         sendMessage: (newMessageBody) => {
//             dispatch(actions.sendMessage(newMessageBody))
//         },
//     }
// }
