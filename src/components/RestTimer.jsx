import { useState, useEffect } from "react";

export default function RestTimer({ open, onClose }) {
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [timerInterval, setTimerInterval] = useState(null);
  const [timerRunning, setTimerRunning] = useState(false);

  function tick() {
    setTimeRemaining((prevState) => prevState - 1);
  }

  function startTimer() {
    setTimerInterval(setInterval(tick, 1000));
    setTimerRunning(true);
  }

  function stopTimer() {
    clearInterval(timerInterval);
    setTimerRunning(false);
  }

  function resetTimer() {
    stopTimer();
    setTimeRemaining(60);
  }

  function formatTimer(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  useEffect(() => {
    if (timeRemaining === 0) stopTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeRemaining]);

  return (
    <div className={open ? "modal is-active" : "modal"}>
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card" style={{ maxWidth: 520 }}>
        <header className="modal-card-head">
          <p className="modal-card-title has-text-centered">Timer</p>
          <button
            className="delete"
            aria-label="close"
            onClick={onClose}
          ></button>
        </header>
        <section className="modal-card-body">
          <p
            className="title is-1 has-text-centered"
            style={{ fontFamily: "monospace" }}
          >
            {formatTimer(timeRemaining)}
          </p>
          <div className="is-fullwidth is-justify-content-space-between">
            <button
              className="button is-link is-outlined"
              onClick={() =>
                setTimeRemaining((prevState) => {
                  if (prevState > 30) return prevState - 30;
                  else return 0;
                })
              }
            >
              - 30
            </button>
            <button
              style={{ float: "right" }}
              className="button is-link is-outlined"
              onClick={() => setTimeRemaining((prevState) => prevState + 30)}
            >
              + 30
            </button>
          </div>
        </section>
        <footer className="modal-card-foot is-justify-content-center">
          {timerRunning ? (
            <button
              className="button is-danger"
              disabled={timeRemaining === 0}
              onClick={stopTimer}
            >
              Stop
            </button>
          ) : (
            <button
              className="button is-success"
              disabled={timeRemaining === 0}
              onClick={startTimer}
            >
              Start
            </button>
          )}
          <button className="button is-info" onClick={resetTimer}>
            Reset
          </button>
          <button className="button is-danger" onClick={onClose}>
            Close
          </button>
        </footer>
      </div>
    </div>
  );
}
