import React from "react";

import Calendar from "../../components/Calendar";
import SideBar from "../../components/SideBar";

import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";

import {PieChart} from 'react-easy-chart';

import "./App.css";

import Appbar from 'muicss/lib/react/appbar';


const myData = [
  { key: 'completed', value: 100 },
  { key: 'remaining', value: 200 }
]

const styles = {
  '.chart_lines': {
    strokeWidth: 0
  },
  '.chart_text': {
    fontFamily: 'serif',
    fontSize: '1.25em',
    fill: '#333'
  }
}

class App extends React.Component {
  render() {
    return (
      <div className="App">
      <Appbar></Appbar>
        <header>
          <div id="logo">
            <span className="icon">date_range</span>
            <span>
              Project management <b>calendar</b>
            </span>
          </div>
        </header>
        <div className="grid-container">
        <SideBar />
        <main>
          <Calendar />
        </main>
         <div>
         <p className="unassigned-task-heading">Task Details</p>
         <PieChart labels size={200} data={myData} 
         styles={styles}
      />
        </div> 
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App)