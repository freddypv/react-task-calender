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

class Task extends Component {
    render() {
        const {connectDragSource} = this.props
        return connectDragSource(
            <div className={'bs-callout bs-callout-warning '+ this.props.type } index={this.props.index}>
            <h4>{this.props.value}</h4>
            <p>Lorem ipsum dolor sit amet, eu legimus inimicus abhorreant mea. Assentior percipitur sit te, mea cu error iuvaret voluptatibus, quo an partem integre conceptam. Cu sed alii ferri. Fabulas legendos prodesset vix cu.</p>
            
            </div>
        )
    }
}
export default DragSource(Types.ITEM, itemSource, collect)(Task)