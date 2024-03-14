import React, {ChangeEvent} from 'react';
import s from './ProfileInfo.module.css';

type PropsType = {
    status: string
    updateStatus: (newStatus: string) => void
}

type StateType = {
    editMode: boolean
    status: string
}

class ProfileStatus extends React.PureComponent<PropsType,StateType> {
    state:StateType = {
        editMode: false,
        status: this.props.status
    };
    activeEditMode = () => {
        this.setState({editMode: true});
    };
    deactiveEditMode = () => {
        this.setState({editMode: false});
        this.props.updateStatus(this.state.status);
    };

    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })

    }

    componentDidUpdate(prevProps: PropsType, prevState: StateType) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    // shouldComponentUpdate(nextProps, nextState) {
    // return nextProps !== this.props || nextState !== this.state;
    // }

    render() {

        return (
            <>
                {this.state.editMode ?
                    <div className={s.profile}>
                        <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactiveEditMode}
                               type="text" value={this.state.status}/>
                    </div>
                    :
                    <div onDoubleClick={this.activeEditMode} className={s.profile}>
                        {this.props.status || "Status"}
                    </div>
                }
            </>
        );
    }
}


export default ProfileStatus;