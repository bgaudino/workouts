import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { formatDate, formatTime } from "../utils/formatDateTime";
import { workoutListUrl, workoutUrl } from "../utils/endPoints";

export default function WorkoutList() {
  const [workouts, setWorkouts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(workoutListUrl).then((res) => setWorkouts(() => res.data));
  }, []);

  async function deleteWorkout(id) {
    const res = await axios.delete(workoutUrl(id));
    if (res.status === 204)
      setWorkouts(() => workouts.filter((workout) => workout.id !== id));
  }

  return (
    <div className="m-3">
      <h2 className="title is-2 has-text-centered">Workout History</h2>
      {!workouts.length && (
        <p className="has-text-centered">No workout yet. Click "New Workout" to get started.</p>
      )}
      {workouts.map((workout) => (
        <div key={workout.id} className="box m-5">
          <div className="mb-3">
            <span style={{ fontSize: "x-large" }}>
              {formatDate(workout.start_date)} {formatTime(workout.start_date)}
            </span>
            <div style={{ float: "right" }}>
              <button
                className="button is-info"
                onClick={() => navigate(`/workout/${workout.id}`)}
              >
                Edit
              </button>
              <button
                className="button is-danger ml-2"
                onClick={() => deleteWorkout(workout.id)}
              >
                Delete
              </button>
            </div>
          </div>
          <table className="table is-bordered is-hoverable is-fullwidth">
            <thead>
              <tr>
                <th>Exercise</th>
                <th>Set</th>
                <th>Reps</th>
                <th>Weight</th>
              </tr>
            </thead>
            <tbody>
              {workout.exercises.map((exercise) => (
                <>
                  {exercise.sets.map((set, i) => (
                    <tr key={set.id}>
                      <td>{exercise.exercise_name}</td>
                      <td>{i + 1}</td>
                      <td>{set.reps}</td>
                      <td>{set.weight}</td>
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
