const { createRoot } = ReactDOM;
const { useState, useEffect, useRef, useCallback } = React;

let heaterKit = [
  {
    key: "q",
    name: "Heater 1",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    key: "w",
    name: "Heater 2",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    key: "e",
    name: "Heater 3",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  {
    key: "a",
    name: "Heater 4",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  {
    key: "s",
    name: "Clap",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  {
    key: "d",
    name: "Open HH",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    key: "z",
    name: "Kick n' Hat",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    key: "x",
    name: "Kick",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    key: "c",
    name: "Closed HH",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
];

let smoothPianoKit = [
  {
    key: "q",
    name: "Chord 1",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
  },
  {
    key: "w",
    name: "Chord 2",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
  },
  {
    key: "e",
    name: "Chord 3",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
  },
  {
    key: "a",
    name: "Shaker",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
  },
  {
    key: "s",
    name: "Open-HH",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
  },
  {
    key: "d",
    name: "Closed-HH",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
  },
  {
    key: "z",
    name: "Punchy-Kick",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
  },
  {
    key: "x",
    name: "Side-Stick",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
  },
  {
    key: "c",
    name: "Snare",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",
  },
];

const kits = {
  "Heater Kit": heaterKit,
  "Smooth Piano Kit": smoothPianoKit,
};

const defaultKit = "Heater Kit";
const defaultVolume = 0.15;

const App = () => {
  const [drums, setDrums] = useState(kits[defaultKit]);
  const [kit, setKit] = useState(defaultKit);
  const [power, setPower] = useState(true);
  const [currentDrum, setCurrentDrum] = useState();
  const [activeDrums, setActiveDrums] = useState({});
  const audioRef = useRef({});

  const playDrum = useCallback(
    (key) => {
      const drum = kits[kit].find((drum) => drum.key === key);
      if (!drum) {
        return;
      }
      setCurrentDrum(drum);
      audioRef.current[key].currentTime = 0;
      audioRef.current[key].play();
      setActiveDrums((currentState) => ({ ...currentState, [key]: true }));
      setTimeout(() => {
        setActiveDrums((currentState) => ({ ...currentState, [key]: false }));
      }, 250);
    },
    [drums, kit]
  );

  const keydownHandler = useCallback(
    (e) => {
      const key = e.key?.toLowerCase();
      playDrum(key);
    },
    [playDrum]
  );

  useEffect(() => {
    window.addEventListener("keydown", keydownHandler);
    return () => {
      window.removeEventListener("keydown", keydownHandler);
    };
  }, [playDrum]);

  useEffect(() => {
    changeVolume(defaultVolume);
  }, []);

  const changeVolume = (volume) => {
    const audios = audioRef.current;
    Object.keys(audios).forEach((key) => (audios[key].volume = volume));
  };

  const changeKit = () => {
    const newKit = kit === "Heater Kit" ? "Smooth Piano Kit" : "Heater Kit";
    setDrums(kits[newKit]);
    setCurrentDrum(null);
    setKit(newKit);
  };

  const changePower = () => {
    setPower((power) => !power);
  };

  const drumsElement = drums.map(({ key, name, audio }, idx) => (
    <button
      key={key}
      id={name}
      disabled={!power}
      className={`drum-pad ${activeDrums[key] ? "drum-pad__active" : ""}`}
      onClick={() => playDrum(key)}
    >
      {key.toUpperCase()}
      <audio
        id={key.toUpperCase()}
        src={audio}
        className="clip"
        ref={(el) => (audioRef.current[key] = el)}
      />
    </button>
  ));

  return (
    <div className="App">
      <div id="drum-machine">
        <div className="drum-pads">{drumsElement}</div>
        <div className="panel">
          <div>
            <label htmlFor="power">Power</label>
            <input
              id="power"
              type="checkbox"
              checked={power}
              onChange={changePower}
            />
          </div>
          <div id="display">
            {(power && (currentDrum?.name ?? kit)) || "\u00A0"}
          </div>
          <div>
            <input
              id="volume"
              max="1"
              min="0"
              step="0.01"
              type="range"
              disabled={!power}
              defaultValue={defaultVolume}
              onChange={(e) => changeVolume(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="bank">Bank</label>
            <input
              id="bank"
              type="checkbox"
              disabled={!power}
              checked={kit === "Smooth Piano Kit"}
              onChange={changeKit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
