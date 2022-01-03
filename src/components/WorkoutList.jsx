import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosInstance } from "../utils/axios";
import { formatDate, formatTime } from "../utils/formatDateTime";
import { workoutListUrl, workoutUrl } from "../utils/endPoints";
import Modal from "./Modal";

export default function WorkoutList() {
  const [loading, setLoading] = useState(true);
  const [workouts, setWorkouts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get(workoutListUrl)
      .then((res) => setWorkouts(() => res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  async function deleteWorkout(id) {
    const res = await axiosInstance.delete(workoutUrl(id));
    if (res.status === 204)
      setWorkouts(() => workouts.filter((workout) => workout.id !== id));
  }

  async function startWorkout() {
    const res = await axiosInstance.post(workoutListUrl);
    navigate(`/workout/${res.data.id}`);
  }

  if (loading) return null;

  return (
    <>
      <section className="hero is-small is-primary">
        <div className="hero-body">
          <p className="title has-text-centered">History</p>
        </div>
      </section>
      <div className="container is-max-desktop m-auto">
        {!workouts.length && (
          <div className="has-text-centered">
            <p className="has-text-centered mt-5 mb-4">
              No workouts yet. Click "New Workout" to get started.
            </p>
            <button className="button is-primary" onClick={startWorkout}>
              New Workout
            </button>
          </div>
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
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Delete Workout"
          body="Are you sure you want to delete this workout? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          isDanger
          onConfirm={() => {
            deleteWorkout(selectedWorkout);
            setSelectedWorkout(null);
            setModalOpen(false);
          }}
        />
      </div>
    </>
  );
}
