import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../Common/Preloader/Preloader';

class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        status: this.props.status
    };
    
    activeEditMode = () => {
        this.setState({ editMode: true });
    };
    deactiveEditMode = () => {
        this.setState({ editMode: false });
        this.props.updateStatus(this.state.status);
    };
    
    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value
        })
        
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {

        return (
            <>
                {this.state.editMode ?
                    <div className={s.profile}>
                        <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactiveEditMode} type="text" value={this.state.status} />
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