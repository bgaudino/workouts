import { useState, useEffect } from "react";
import { formatDate, formatTime } from "../utils/formatDateTime";
import Exercise from "./Exercise";
import { axiosInstance } from "../utils/axios";
import {
  exerciseCreateUrl,
  exerciseDeleteUrl,
  workoutUrl,
} from "../utils/endPoints";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faWindowClose } from "@fortawesome/free-solid-svg-icons";

export default function Workout() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [workout, setWorkout] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [exerciseName, setExerciseName] = useState("");
  const [error, setError] = useState("");
  const date = formatDate(workout.start_date);
  const time = formatTime(workout.start_date);

  useEffect(() => {
    axiosInstance
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
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await axiosInstance.post(exerciseCreateUrl, {
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
    const res = await axiosInstance.delete(exerciseDeleteUrl(id));
    if (res.status === 204)
      setWorkout(() => ({
        ...workout,
        exercises: workout.exercises.filter((exercise) => exercise.id !== id),
      }));
  }

  if (loading) return null;
  if (error) return <div>{error}</div>;

  return (
    <>
      <section className="hero is-primary is-small has-text-centered">
        <div className="hero-body">
          <p className="title">{date}</p>
          <p className="subtitle">{time}</p>
        </div>
      </section>
      <div className="container mt-5 is-max-desktop">
        <div className="container is-fluid has-text-centered">
          {showForm ? (
            <form onSubmit={handleSubmit}>
              <div className="field has-addons">
                <div className="control is-expanded">
                  <input
                    autoFocus
                    list="exercise-types"
                    className="input is-fullwidth"
                    value={exerciseName}
                    onChange={(e) => setExerciseName(e.target.value)}
                    type="text"
                    name="exercise"
                    placeholder="Exercise name"
                  />
                  <datalist id="exercise-types">
                    <option value="Barbell Squat" />
                    <option value="Bench Press" />
                    <option value="Bent Over Row" />
                    <option value="Biceps Curl" />
                    <option value="Cable Row" />
                    <option value="Deadlift" />
                    <option value="Dumbbell Row" />
                    <option value="Dumbbell Shoulder Press" />
                    <option value="Lat Pulldown" />
                  </datalist>
                </div>

                <div className="control">
                  <button
                    disabled={!exerciseName}
                    className="button is-success"
                    type="submit"
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </button>
                </div>
                <div className="control">
                  <button
                    className="button is-danger"
                    onClick={() => setShowForm(false)}
                  >
                    <FontAwesomeIcon icon={faWindowClose} />
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <button
              style={{ margin: "auto" }}
              className="button is-primary"
              onClick={() => setShowForm(true)}
            >
              Add New Exercise
            </button>
          )}
          {!workout.exercises?.length && !showForm && (
            <p className="mt-5">Add an exercise to get started</p>
          )}
        </div>
        {workout.exercises?.map((exercise) => (
          <Exercise
            key={exercise.id}
            exercise={exercise}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </>
  );
}
