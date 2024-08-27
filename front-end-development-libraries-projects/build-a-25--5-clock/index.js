const { createRoot } = ReactDOM;
const { useState, useEffect, useRef, useCallback } = React;

const defaultBreakLength = 5;
const defaultSessionLength = 25;
const defaultTimeLeft = defaultSessionLength * 60 * 1000;
const minLength = 1;
const maxLength = 60;

const App = () => {
  const [breakLength, setBreakLength] = useState(defaultBreakLength);
  const [sessionLength, setSessionLength] = useState(defaultSessionLength);
  const [timeLeft, setTimeLeft] = useState(defaultTimeLeft);
  const [timestamp, setTimestamp] = useState(new Date());
  const [isSession, setIsSession] = useState(true);
  const [isStarted, setIsStarted] = useState(false);
  const intervalRef = useRef();
  const audioRef = useRef();

  useEffect(() => {
    if (timeLeft < 0) {
      audioRef.current?.play();
      if (isSession) {
        setTimeLeft(breakLength * 1000 * 60);
        setIsSession(false);
      } else {
        setTimeLeft(sessionLength * 1000 * 60);
        setIsSession(true);
      }
    }
  }, [timeLeft]);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  const isDisabled = (value, diff) => {
    return isStarted || value + diff > maxLength || value + diff < minLength;
  };

  const incBreak = () => {
    changeLength(false, 1);
  };

  const decBreak = () => {
    changeLength(false, -1);
  };

  const incSession = () => {
    changeLength(true, 1);
  };

  const decSession = () => {
    changeLength(true, -1);
  };

  const changeLength = (_isSession, diff) => {
    const length = _isSession ? sessionLength : breakLength;
    const setLength = _isSession ? setSessionLength : setBreakLength;
    const newLength = length + diff;
    setLength(newLength);
    if (isSession === _isSession) {
      setTimeLeft(newLength * 1000 * 60);
    }
  };

  const start = () => {
    setIsStarted(true);
    intervalRef.current = setInterval(() => {
      setTimeLeft((current) => current - 1000);
    }, 1000);
  };

  const stop = () => {
    setIsStarted(false);
    clearInterval(intervalRef.current);
  };

  const onStartStopClick = () => {
    if (isStarted) {
      stop();
    } else {
      start();
    }
  };

  const reset = () => {
    setBreakLength(defaultBreakLength);
    setSessionLength(defaultSessionLength);
    setTimeLeft(defaultTimeLeft);
    setIsSession(true);
    setIsStarted(false);
    audioRef.current.currentTime = 0;
    audioRef.current?.pause();
    clearInterval(intervalRef.current);
  };

  const getTimeLeft = () => {
    const date = new Date(timeLeft);
    const lenght = isSession ? sessionLength : breakLength;
    const minutes =
      lenght === 60 && date.getMinutes() === 0 ? 60 : date.getMinutes();
    const seconds = date.getSeconds();

    const getTwoSignTime = (value) => {
      return value < 10 ? `0${value}` : value;
    };

    return `${getTwoSignTime(minutes)}:${getTwoSignTime(seconds)}`;
  };

  const getIsLastMinute = () => {
    const date = new Date(timeLeft);
    const lenght = isSession ? sessionLength : breakLength;
    const minutes =
      lenght === 60 && date.getMinutes() === 0 ? 60 : date.getMinutes();

    return minutes === 0;
  };

  return (
    <div className="App">
      <div className="pomidoro">
        <div className="breakSessionControls">
          <div className="breakControls">
            <div id="break-label">Break Length</div>
            <div className="controls">
              <button
                id="break-decrement"
                disabled={isDisabled(breakLength, -1)}
                onClick={decBreak}
              >
                -
              </button>
              <div id="break-length">{breakLength}</div>
              <button
                id="break-increment"
                disabled={isDisabled(breakLength, 1)}
                onClick={incBreak}
              >
                +
              </button>
            </div>
          </div>
          <div className="sessionControls">
            <div id="session-label">Session Length</div>
            <div className="controls">
              <button
                id="session-decrement"
                disabled={isDisabled(sessionLength, -1)}
                onClick={decSession}
              >
                -
              </button>
              <div id="session-length">{sessionLength}</div>
              <button
                id="session-increment"
                disabled={isDisabled(sessionLength, 1)}
                onClick={incSession}
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div
          className={`timeLeftDisplay ${
            getIsLastMinute() ? "timeLeftDisplay_lastMinute" : ""
          }`}
        >
          <div id="timer-label">{isSession ? "Session" : "Break"}</div>
          <div id="time-left">{getTimeLeft()}</div>
        </div>

        <div className="startStopResetControls">
          <button id="start_stop" onClick={onStartStopClick}>
            {isStarted ? "stop" : "start"}
          </button>
          <button id="reset" onClick={reset}>
            reset
          </button>
        </div>
      </div>
      <audio
        ref={audioRef}
        id="beep"
        src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"
      />
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
