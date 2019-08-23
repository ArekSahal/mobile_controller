import React from 'react';
import './App.css';

import io from 'socket.io-client'
import ip from "./ip_adress"

const url = ip + ":5000";

function App() {
  return (
    <div className="App">
      < ChatBox/>
    </div>
  );
}

class ChatBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {connected: false,
                    socket: false,
                    ping: "over 9000",
                    prePressed: "None"
                  }
    this.handlePress = this.handlePress.bind(this)
      this.handleRelease = this.handleRelease.bind(this)
  }

  componentDidMount() {

    var sock = io.connect(url);
    this.setState({socket: sock})

    sock.on("connect", () => {


        this.setState({connected: true,
                                client: sock.id,});
        console.log(this.state.socket.id);
        console.log("connected")
      this.state.socket.send("\n \n User has connected to socket \n \n");

        setInterval(() => {
            var seconds = new Date() / 1000;
            this.state.socket.emit("pings", {time: seconds, client: this.state.client})
        },1000);


        this.state.socket.on("reping", (d) => {
            var s1 = new Date() / 1000
            this.setState({ping: s1 - d.ping})
        })



    })

     sock.on("message", function(msg) {
          console.log(msg)
      })
  }

  handlePress(e) {
      console.log("pressed")
      this.setState({prePressed: e.target.id})
      this.state.socket.emit("button", {action: "press", key: e.target.id})

  }
    handleRelease(e) {
        //console.log("button has been released")
        this.state.socket.emit("button", {action: "release", key: e.target.id})

    }
  render() {
      return (<div>
          <p id={"ping"}>
              {Math.round(this.state.ping * 500)} ms
          </p>
          <div id={"up"} className={"button"} onTouchStart={this.handlePress} onTouchEnd={this.handleRelease}>
                    <p id={"up."}>UP</p>
                </div>
          <div id={"down"} className={"button"} onTouchStart={this.handlePress} onTouchEnd={this.handleRelease}>
              <p id={"down."}>DOWN</p>
          </div>
          <div id={"left"} className={"button"} onTouchStart={this.handlePress} onTouchEnd={this.handleRelease}>
              <p id={"left."}>LEFT</p>
          </div>
          <div id={"right"} className={"button"} onTouchStart={this.handlePress} onTouchEnd={this.handleRelease}>
              <p id={"right."}>RIGHT</p>
          </div>
          <div id={"A"} className={"button"} onTouchStart={this.handlePress} onTouchEnd={this.handleRelease}>
              <p id={"A."}>A</p>
          </div>
          <div id={"B"} className={"button"} onTouchStart={this.handlePress} onTouchEnd={this.handleRelease}>
              <p id={"B."}>B</p>
          </div>
          <h1>
              {this.state.prePressed}
          </h1>
      </div>)
  }
}
export default App;
