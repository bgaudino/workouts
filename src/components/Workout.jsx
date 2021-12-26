import { useState, useEffect } from "react";
import { formatDate } from "../utils/formatDateTime";
import Exercise from "./Exercise";
import axios from "axios";
import {
  exerciseCreateUrl,
  exerciseDeleteUrl,
  exerciseUrl,
  workoutUrl,
} from "../utils/endPoints";
import { useParams } from "react-router-dom";

export default function Workout() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [workout, setWorkout] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [exerciseName, setExerciseName] = useState("");
  const [error, setError] = useState("");
  const date = formatDate(workout.start_date);

  useEffect(() => {
    axios
      .get(workoutUrl(id))
      .then((res) => {
        setWorkout(() => res.data);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          setError("Workout not found");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await axios.post(exerciseCreateUrl, {
      workout_id: workout.id,
      exercise_name: exerciseName,
    });
    setWorkout(() => ({
      ...workout,
      exercises: [...workout.exercises, res.data],
    }));
    setExerciseName("");
    setShowForm(false);
  }

  async function handleDelete(id) {
    const res = await axios.delete(exerciseDeleteUrl(id));
    if (res.status === 204)
      setWorkout(() => ({
        ...workout,
        exercises: workout.exercises.filter((exercise) => exercise.id !== id),
      }));
  }

  if (loading) return null;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>{date}</h2>
      {showForm ? (
        <form onSubmit={handleSubmit}>
          <input
            autoFocus
            value={exerciseName}
            onChange={(e) => setExerciseName(e.target.value)}
            type="text"
            name="exercise"
            placeholder="Exercise name"
          />
          <button type="submit">Submit</button>
          <button onClick={() => setShowForm(false)}>Cancel</button>
        </form>
      ) : (
        <button onClick={() => setShowForm(true)}>Add New Exercise</button>
      )}
      {!workout.exercises?.length && <p>No exercises</p>}
      {workout.exercises?.map((exercise) => (
        <Exercise
          key={exercise.id}
          exercise={exercise}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
}
