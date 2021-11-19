import Chat from "./chat/chat";
import Home from "./home/home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import React from "react";
import io from "socket.io-client";

const socket = io.connect('/');

function Appmain(props) {
  console.log()
  return (
    <React.Fragment>
      <div className="right">
        <Chat
          userName={props.match.params.userName}
          roomName={props.match.params.roomName}
          socket={socket}
        />
      </div>
    </React.Fragment>
  );
}
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact>
            <Home socket={socket} />
          </Route>
          <Route path="/chat/:roomName/:userName" component={Appmain} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
