import './App.css';

function App() {
  return (
    <div className="App">
      <h1 className="title" >Drum Machine</h1>
      <div id="drum-machine" class="inner-container">
        <div id="display" className="pads-container" >
          <div className="drum-pad" id="Heater-1">Q</div>
          <div className="drum-pad" id="Heater-2">W</div>
          <div className="drum-pad" id="Heater-3">E</div>
          <div className="drum-pad" id="Heater-4">A</div>
          <div className="drum-pad" id="Clap">S</div>
          <div className="drum-pad" id="Open-HH">D</div>
          <div className="drum-pad" id="Kick-n'-Hat">Z</div>
          <div className="drum-pad" id="Kick">X</div>
          <div className="drum-pad" id="Closed-HH">C</div>
        </div>
        <div className="controls-container">
          <div id="power-btn" className="power">
            <p>Power</p>
            <div className="select">
              <div className="inner"></div>
            </div>
          </div>
          <div id="current-pad" className="pad-display"></div>
          <div id="volume-btn" className="volume-btn"></div>
          <div id="bank-btn" class="bank-btn"><p>Bank</p></div>
        </div>
      </div>
    </div>
  );
}

export default App;
