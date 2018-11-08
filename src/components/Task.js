import React, {Component} from "react";
import { DragSource } from 'react-dnd';
const Types = {
 ITEM: 'toy'
}
const itemSource = {
 beginDrag(props) {
 console.log('here1',props);
 return props;
 },
 endDrag(props) {
 console.log('here',props)
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
 const { isDragging, connectDragSource, src } = this.props
 return connectDragSource(
 <li>Task no {this.props.no}</li>
 )
 }
}
export default DragSource(Types.ITEM, itemSource, collect)(Task)