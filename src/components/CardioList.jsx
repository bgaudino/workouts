import axios from "axios";
import { useState, useEffect } from "react";
import { cardioListUrl } from "../utils/endPoints";

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
            <p>{workout.distance}</p>
            <p>{workout.moving_time}</p>
            <p>{workout.average_speed}</p>
            <p>{workout.average_heartrate}</p>
            <p>{workout.max_heartrate}</p>
            <p>{workout.max_speed}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
