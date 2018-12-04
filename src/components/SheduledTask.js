import React, {Component} from "react";
import {DragSource} from 'react-dnd';

const Types = {
    ITEM: 'toy'
}
const itemSource = {
    beginDrag(props) {
        return props;
    },
    endDrag(props) {
    }
}
function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

class SheduledTask extends Component {

    constructor( props ){
        super( props );
        this.taskSelected = this.taskSelected.bind(this);
    }

    taskSelected() {
        this.props.onClick(this.props.value);
    }

    render() {
        const {connectDragSource} = this.props
        return connectDragSource(
            <div className="usigned-tasks" sheduleddate={this.props.sheduleddate} onClick={this.taskSelected}>{this.props.value}</div>
        )
    }
}
export default DragSource(Types.ITEM, itemSource, collect)(SheduledTask)