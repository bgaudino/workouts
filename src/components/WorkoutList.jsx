import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { formatDate, formatTime } from "../utils/formatDateTime";
import { workoutListUrl, workoutUrl } from "../utils/endPoints";

export default function WorkoutList() {
  const [loading, setLoading] = useState(true);
  const [workouts, setWorkouts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(workoutListUrl)
      .then((res) => setWorkouts(() => res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  async function deleteWorkout(id) {
    const res = await axios.delete(workoutUrl(id));
    if (res.status === 204)
      setWorkouts(() => workouts.filter((workout) => workout.id !== id));
  }

  if (loading) return null;

  return (
    <>
      <section class="hero is-small is-primary">
        <div class="hero-body">
          <p class="title has-text-centered">History</p>
        </div>
      </section>
      <div className="container is-max-desktop m-auto">
        {!workouts.length && (
          <p className="has-text-centered">
            No workout yet. Click "New Workout" to get started.
          </p>
        )}
        {workouts.map((workout) => (
          <div key={workout.id} className="box m-5">
            <div className="mb-3">
              <span style={{ fontSize: "x-large" }}>
                {formatDate(workout.start_date)}{" "}
                {formatTime(workout.start_date)}
              </span>
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
            <div className="buttons has-addons is-right">
              <button
                className="button is-info"
                onClick={() => navigate(`/workout/${workout.id}`)}
              >
                Edit
              </button>
              <button
                className="button is-danger"
                onClick={() => {
                  setModalOpen(true);
                  setSelectedWorkout(workout.id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        <div className={modalOpen ? "modal is-active" : "modal"}>
          <div
            class="modal-background"
            onClick={() => setModalOpen(false)}
          ></div>
          <div class="modal-card" style={{ maxWidth: 520 }}>
            <header class="modal-card-head">
              <p class="modal-card-title">Delete Confirmation</p>
              <button
                class="delete"
                aria-label="close"
                onClick={() => setModalOpen(false)}
              ></button>
            </header>
            <section class="modal-card-body">
              Are you sure you want to delete this workout? This cannot be
              undone.
            </section>
            <footer class="modal-card-foot is-justify-content-end">
              <button
                class="button is-danger"
                onClick={() => {
                  deleteWorkout(selectedWorkout);
                  setSelectedWorkout(null);
                  setModalOpen(false);
                }}
              >
                Delete
              </button>
              <button class="button" onClick={() => setModalOpen(false)}>
                Cancel
              </button>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
}
