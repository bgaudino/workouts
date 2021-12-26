import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { formatDate } from "../utils/formatDateTime";
import { workoutListUrl, workoutUrl } from "../utils/endPoints";

export default function WorkoutList() {
  const [workouts, setWorkouts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(workoutListUrl).then((res) => setWorkouts(() => res.data));
  }, []);

  async function startWorkout() {
    const res = await axios.post(workoutListUrl);
    navigate(`/workout/${res.data.id}`);
  }

  async function deleteWorkout(id) {
    const res = await axios.delete(workoutUrl(id));
    if (res.status === 204)
      setWorkouts(() => workouts.filter((workout) => workout.id !== id));
  }

  return (
    <>
      <button onClick={startWorkout}>Start New Workout</button>
      {workouts.map((workout) => (
        <div key={workout.id}>
          <Link to={`/workout/${workout.id}`}>
            {formatDate(workout.start_date)}
          </Link>
          <button onClick={() => deleteWorkout(workout.id)}>Delete</button>
        </div>
      ))}
    </>
  );
}
