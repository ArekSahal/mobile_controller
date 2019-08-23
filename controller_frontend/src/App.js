import React from 'react';
import './App.css';

import io from 'socket.io-client'




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
                    ping: "over 9000"
                  }
    this.handlePress = this.handlePress.bind(this)
      this.handleRelease = this.handleRelease.bind(this)
  }

  componentDidMount() {

    var sock = io.connect("http://192.168.10.189:5000");
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

  handlePress() {
      //console.log("button has been pressed")
      this.state.socket.emit("button", {action: "press", key: "space"})

  }
    handleRelease() {
        //console.log("button has been released")
        this.state.socket.emit("button", {action: "release", key: "space"})

    }
  render() {
      return (<div><h1>ChatBox</h1>
          <p>
              {Math.round(this.state.ping * 500)} ms
          </p>
          <div id={"button"} onTouchStart={this.handlePress} onTouchEnd={this.handleRelease}>
                    up
                </div>
      </div>)
  }
}
export default App;