import React from "react";

import Calendar from "../../components/Calendar";
import SideBar from "../../components/SideBar";

import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";

import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header>
          <div id="logo">
            <span className="icon">date_range</span>
            <span>
              Project managnment app <b>calendar</b>
            </span>
          </div>
        </header>
        <div className="grid-container">
        <SideBar />
        <main>
          <Calendar />
        </main>
          </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App)