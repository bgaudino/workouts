import axios from "axios";
import { useState, useEffect } from "react";
import { cardioListUrl } from "../utils/endPoints";
import {
  formatDistance,
  formatDuration,
  getAveragePace,
} from "../utils/formatCardio";

export default function CardioList() {
  const [workouts, setWorkouts] = useState([]);
  useEffect(() => {
    axios
      .get(cardioListUrl)
      .then((res) => {
        setWorkouts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container">
      <h2 className="title is-2 has-text-centered">Cardio List</h2>
      {workouts.map((workout) => (
        <div className="card m-5" key={workout.id}>
          <div className="card-header">
            <p className="card-header-title">{workout.name}</p>
          </div>
          <div className="card-content">
            <p>
              <strong>Distance: </strong>
              {formatDistance(workout.distance)} miles
            </p>
            <p>
              <strong>Duration: </strong>
              {formatDuration(workout.moving_time)} minutes
            </p>
            <p>
              <strong>Average Pace: </strong>
              {getAveragePace(workout.distance, workout.moving_time)} minutes
              per mile
            </p>
            <p>
              <strong>Avg Speed: </strong>
              {workout.average_speed} mph
            </p>
            <p>
              <strong>Max Speed: </strong>
              {workout.max_speed} mph
            </p>
            {workout.has_heartrate && (
              <>
                <p>
                  <strong>Avg Heartrate: </strong>
                  {workout.average_heartrate} bpm
                </p>
                <p>
                  <strong>Max Heartrate: </strong>
                  {workout.max_heartrate} bpm
                </p>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
