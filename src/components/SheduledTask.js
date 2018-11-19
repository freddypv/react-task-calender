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
    render() {
        const {connectDragSource} = this.props
        return connectDragSource(
            <div className="usigned-tasks" sheduleddate={this.props.sheduleddate}>{this.props.value}</div>
        )
    }
}
export default DragSource(Types.ITEM, itemSource, collect)(SheduledTask)