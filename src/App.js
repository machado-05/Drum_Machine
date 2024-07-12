import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [powerOn, setPowerOn] = useState(true);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [displayText, setDisplayText] = useState('');
  const [volume, setVolume] = useState(1);
  const playAudio = (audioEl, description) => {
    if (currentlyPlaying && currentlyPlaying !== audioEl) {
      currentlyPlaying.pause();
      currentlyPlaying.currentTime = 0;
    }

    audioEl.pause();
    audioEl.currentTime = 0;
    audioEl.volume = volume;
    audioEl.play().catch(error => console.error("Error playing audio: ", error));
    setCurrentlyPlaying(audioEl);
    setDisplayText(description);
  }

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (!powerOn) return;
      const key = event.key.toUpperCase();
      const audioEl = document.getElementById(key);
      if (audioEl) {
        const parentDiv = audioEl.parentElement;
        const description = parentDiv.getAttribute('data-description');
        playAudio(audioEl, description);
        parentDiv.classList.add('active');
        setTimeout(() => {
          parentDiv.classList.remove('active');
        }, 100);
      }
    };

    const handleClick = (event) => {
      if (!powerOn) return;
      const audioEl = event.currentTarget.querySelector('audio');
      if (audioEl) {
        const parentDiv = audioEl.parentElement;
        const description = parentDiv.getAttribute('data-description');
        playAudio(audioEl, description);
        parentDiv.classList.add('active');
        setTimeout(() => {
          parentDiv.classList.remove('active');
        }, 100);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    const padIds = [
      { id: 'Heater-1', description: 'Heater 1' },
      { id: 'Heater-2', description: 'Heater 2' },
      { id: 'Heater-3', description: 'Heater 3' },
      { id: 'Heater-4', description: 'Heater 4' },
      { id: 'Clap', description: 'Clap' },
      { id: 'Open-HH', description: 'Open HH' },
      { id: 'Kick-n\'-Hat', description: 'Kick n\' Hat' },
      { id: 'Kick', description: 'Kick' },
      { id: 'Closed-HH', description: 'Closed HH' }
    ];

    padIds.forEach(({ id, description }) => {
      const pad = document.getElementById(id);
      if (pad) {
        pad.setAttribute('data-description', description); // Set description attribute
        pad.addEventListener('click', handleClick);
      }
    });

    const handleBankClick = () => {
      setDisplayText("Not yet implemented :(")
    }

    const bankBtn = document.getElementById('bank-btn');
    if (bankBtn) {
      bankBtn.addEventListener('click', handleBankClick);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      document.getElementById('bank-btn').removeEventListener('click', handleBankClick)
      padIds.forEach(({ id }) => {
        const pad = document.getElementById(id);
        if (pad) {
          pad.removeEventListener('click', handleClick);
        }
      });
    };
  }, [currentlyPlaying, powerOn, volume]);

  const togglePower = () => {
    setPowerOn(prev => !prev);
    if (powerOn) {
      // If the power is being turned off, stop the audio and ignore the display
      if (currentlyPlaying) {
        currentlyPlaying.pause();
        currentlyPlaying.currentTime = 0;
        setCurrentlyPlaying(null);
      }
      setDisplayText('');
    }
  };

  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
  }

 

  return (
    <div className="App">
      <h1 className="title">Drum Machine</h1>
      <div id="drum-machine" className="inner-container">
        <div id="display" className="pad-display">{displayText}</div>
        <div className="pads-container">
          <div className="drum-pad" id="Heater-1">
            <audio src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3" className="clip" id="Q" />
            Q
          </div>
          <div className="drum-pad" id="Heater-2">
            <audio src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3" className="clip" id="W" />
            W
          </div>
          <div className="drum-pad" id="Heater-3">
            <audio src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3" className="clip" id="E" />
            E
          </div>
          <div className="drum-pad" id="Heater-4">
            <audio src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3" className="clip" id="A" />
            A
          </div>
          <div className="drum-pad" id="Clap">
            <audio src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3" className="clip" id="S" />
            S
          </div>
          <div className="drum-pad" id="Open-HH">
            <audio src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3" className="clip" id="D" />
            D
          </div>
          <div className="drum-pad" id="Kick-n'-Hat">
            <audio src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3" className="clip" id="Z" />
            Z
          </div>
          <div className="drum-pad" id="Kick">
            <audio src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3" className="clip" id="X" />
            X
          </div>
          <div className="drum-pad" id="Closed-HH">
            <audio src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3" className="clip" id="C" />
            C
          </div>
        </div>
        <div className="controls-container">
          <div id="power-btn" className={`control power ${powerOn ? 'on' : 'off'}`} onClick={togglePower}>
            <p>Power</p>
            <div className={`select ${powerOn ? 'on' : 'off'}`}>
              <div className={`inner ${powerOn ? 'on' : 'off'}`}></div>
            </div>
          </div>
          <div  className="volume-slider-container">
            <p>Volume</p>
            <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} className="volume-slider" />
          </div>
          <div id="bank-btn" className="control bank-btn">
            <p>Bank</p>
            <div className="select">
              <div className="inner"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
