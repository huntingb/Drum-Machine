import React from 'react';
import './App.css';

const KEYBINDINGS = {
  q: "kick",
  w: "snare",
  e: "tom",
  a: "conga",
  s: "closed-hat",
  d: "open-hat",
  z: "cowbell",
  x: "clav",
  c: "rim"
}

class DrumMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sound: "",
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }
  
  handleClick(sound) {
    this.setState({sound: sound});
    let url = `audio/${sound}.wav`;
    new Audio(url).play();
  }

  handleKeyDown(e) {
    let keyBindings = this.props.keyBindings;
    if (Object.keys(keyBindings).includes(e.key)) {
      document.querySelector(`button#${e.key}`).focus();
      let sound = keyBindings[e.key];
      this.setState({sound: sound});
      let url = `audio/${sound}.wav`;
      new Audio(url).play();
    }
  }

  render() {
    let keyBindings = this.props.keyBindings;

    return (
      <div id="drum-machine">
        <p>{this.state.sound}</p>
        <div id="drum-pad">
          {Object.entries(keyBindings).map(([k, v]) => (
            <button onClick={() => this.handleClick(v)}
                    id={k}
                    key={k}>
              {k}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

function App() {
  return (
    <DrumMachine keyBindings={KEYBINDINGS} /> 
      );
}

export default App;
