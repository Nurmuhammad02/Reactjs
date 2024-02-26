import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../Common/Preloader/Preloader';

class ProfileStatus extends React.Component {
    state = {
        editMode: false,
    };

    activeEditMode = () => {
        this.setState({ editMode: true });
    };
    deactiveEditMode = () => {
        this.setState({ editMode: false });
    };

    render() {
        return (
            <>
                {this.state.editMode ?
                    <div className={s.profile}>
                        <input autoFocus={true} onBlur={this.deactiveEditMode} type="text" value={this.props.status} />
                    </div>
                    :
                    <div onDoubleClick={this.activeEditMode} className={s.profile}>
                        {this.props.status ? this.props.status : "Status"}
                    </div>
                }
            </>
        );
    }
}


export default ProfileStatus;