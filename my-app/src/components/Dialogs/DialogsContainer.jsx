import Dialogs from './Dialogs';
import {actions} from '../../redux/dialogs-reducer';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (newMessageBody) => {
            dispatch(actions.sendMessageCreator(newMessageBody))
        },
    }
}

export default withAuthRedirect(connect(mapStateToProps, mapDispatchToProps)(Dialogs));