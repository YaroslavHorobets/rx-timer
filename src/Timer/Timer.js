import React, { useEffect, useState } from "react";

const Timer = (props) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let hours = Math.floor(props.timePassed / 3600);
    setHours(() => (hours.toString().length === 1 ? "0" : "") + hours);

    let minutes = Math.floor((props.timePassed % 3600) / 60);
    setMinutes(() => (minutes.toString().length === 1 ? "0" : "") + minutes);

    let seconds = props.timePassed % 60;
    setSeconds(() => (seconds.toString().length === 1 ? "0" : "") + seconds);
  }, [props.timePassed]);

  return (
    <>
      <h2>
        {hours}:{minutes}:{seconds}
      </h2>
      <div>
        <button onClick={props.onStart} className="timer-btn">
          Start/Stop
        </button>
        <button onClick={props.onWait} className="timer-btn">
          Wait
        </button>
        <button onClick={props.onReset} className="timer-btn">
          Reset
        </button>
      </div>
    </>
  );
};

export default Timer;
