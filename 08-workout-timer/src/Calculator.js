import { memo, useEffect, useState } from "react";
import clickSound from "./ClickSound.m4a";
import PropTypes from "prop-types"
function Calculator ({ workouts, allowSound }) {
  const [number, setNumber] = useState(workouts.at(0).numExercises);
  const [sets, setSets] = useState(3);
  const [speed, setSpeed] = useState(90);
  const [durationBreak, setDurationBreak] = useState(5);

  const [duration, setDuration] = useState(0);

  //For play music
  // const playSound = useCallback(
  //   function () {
  //     if (!allowSound) return;
  //     const sound = new Audio(clickSound);
  //     sound.play();
  //   },
  //   [allowSound]
  // );

  useEffect(
    function () {
      setDuration((number * sets * speed) / 60 + (sets - 1) * durationBreak);
    },
    [number, sets, speed, durationBreak]
  );

  useEffect(
    function () {
      const playSound = function () {
        if (!allowSound) return;
        const sound = new Audio(clickSound);
        sound.play();
      };

      playSound();
    },
    [duration, allowSound]
  );

  //3rd effect
  // useEffect(
  //   function () {
  //     console.log(duration, sets);
  //     document.title = `Your ${number}-exercise workout`;
  //   },
  //   [number, duration, sets]
  // );

  const mins = Math.floor(duration);
  const seconds = (duration - mins) * 60;

  function handleInc () {
    setDuration((duration) => Math.floor(duration) + 1);
  }

  function handleDec () {
    setDuration((duration) => (duration > 1 ? Math.ceil(duration) - 1 : 0));
  }

  return (
    <>
      <form>
        <div>
          <label htmlFor="workouts">Type of workout</label>
          <select value={number} onChange={(e) => setNumber(+e.target.value)} id="workouts">
            {workouts.map((workout) => (
              <option value={workout.numExercises} key={workout.name}>
                {workout.name} ({workout.numExercises} exercises)
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="sets">How many sets?</label>
          <input
            id="sets"
            type="range"
            min="1"
            max="5"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
          />
          <span>{sets}</span>
        </div>
        <div>
          <label htmlFor="speed">How fast are you?</label>
          <input
            id="speed"
            type="range"
            min="30"
            max="180"
            step="30"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
          />
          <span>{speed} sec/exercise</span>
        </div>
        <div>
          <label htmlFor="durationBreak">Break length</label>
          <input
            id="durationBreak"
            type="range"
            min="1"
            max="10"
            value={durationBreak}
            onChange={(e) => setDurationBreak(e.target.value)}
          />
          <span>{durationBreak} minutes/break</span>
        </div>
      </form>
      <section>
        <button onClick={handleDec}>–</button>
        <p>
          {mins < 10 && "0"}
          {mins}:{seconds < 10 && "0"}
          {seconds}
        </p>
        <button onClick={handleInc}>+</button>
      </section>
    </>
  );
}

Calculator.propTypes = {
  workouts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      numExercises: PropTypes.number.isRequired,
    })
  ).isRequired,
  allowSound: PropTypes.bool.isRequired,
}

export default memo(Calculator);
