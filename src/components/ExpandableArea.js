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

class ExpandableArea extends Component {
    render() {
        const {connectDragSource} = this.props
        return connectDragSource(
            <div className="expandable-area" sheduleddate={this.props.sheduleddate}></div>
        )
    }
}
export default DragSource(Types.ITEM, itemSource, collect)(ExpandableArea)