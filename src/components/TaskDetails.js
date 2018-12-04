import React, { Component } from "react";

class Task extends Component {

    render() {
        const { currentTask, status, handleClose } = this.props;
        const showHideClassName = status ? "modal display-block" : "modal display-none";

        return (<div id="myModal" className={showHideClassName} ><div className="modal-content"><span className="close" onClick={handleClose}>&times;</span><p>Description for {currentTask.title}</p></div></div>);
    }
}
export default Task