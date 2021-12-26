import { useState } from "react";
import {
  setCreateUrl,
  setDeleteUrl,
  exerciseUpdateUrl,
} from "../utils/endPoints";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faCheck,
  faWindowClose,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

export default function Exercise({ exercise, handleDelete }) {
  const [myExercise, setMyExercise] = useState(exercise);
  const [exerciseName, setExerciseName] = useState(exercise.exercise_name);
  const [nameEditable, setNameEditable] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [weight, setWeight] = useState(0);
  const [reps, setReps] = useState(0);

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await axios.post(setCreateUrl, {
      exercise_id: exercise.id,
      weight,
      reps,
    });
    setMyExercise({
      ...myExercise,
      sets: [...myExercise.sets, res.data],
    });
    setShowForm(false);
  }

  async function deleteSet(id) {
    const res = await axios.delete(setDeleteUrl(id));
    if (res.status === 204)
      setMyExercise({
        ...myExercise,
        sets: myExercise.sets.filter((set) => set.id !== id),
      });
  }

  async function updateName() {
    const res = await axios.put(exerciseUpdateUrl, {
      exercise_id: exercise.id,
      exercise_name: exerciseName,
    });
    setMyExercise({
      ...myExercise,
      exercise_name: res.data.exercise_name,
    });
    setNameEditable(false);
  }

  return (
    <div className="card m-5">
      <div className="card-header">
        <div className="card-header-title">
          {nameEditable ? (
            <form
              style={{ width: "100%" }}
              onSubmit={(e) => {
                e.preventDefault();
                updateName();
              }}
            >
              <div className="field">
                <div className="control is-expanded">
                  <input
                    autoFocus
                    className="input is-fullwidth"
                    placeholder="Exercise Name"
                    value={exerciseName}
                    onChange={(e) => setExerciseName(e.target.value)}
                  />
                </div>
              </div>
            </form>
          ) : (
            myExercise.exercise_name
          )}
        </div>
        <div className="card-header-icon">
          {!nameEditable ? (
            <span className="has-text-info">
              <FontAwesomeIcon
                icon={faEdit}
                onClick={() => setNameEditable(true)}
              />
            </span>
          ) : (
            <>
              <span className="has-text-danger">
                <FontAwesomeIcon
                  icon={faWindowClose}
                  onClick={() => {
                    setExerciseName(myExercise.exercise_name);
                    setNameEditable(false);
                  }}
                />
              </span>
              <span className="has-text-success">
                <FontAwesomeIcon
                  className="ml-3"
                  icon={faCheck}
                  onClick={updateName}
                />
              </span>
            </>
          )}
        </div>
      </div>
      <div className="card-content">
        {!myExercise.sets?.length && !showForm && (
          <p>Add a set to get started.</p>
        )}
        {myExercise.sets.map((set, i) => (
          <div key={set.id}>
            Set {i + 1}: {set.weight}lbs x {set.reps}
            <span
              class="icon has-text-danger"
              style={{ float: "right", cursor: "pointer" }}
            >
              <FontAwesomeIcon
                icon={faTrash}
                onClick={() => deleteSet(set.id)}
              />
            </span>
          </div>
        ))}
        {showForm && (
          <form className="mt-3" onSubmit={handleSubmit}>
            <div className="field has-addons">
              <div className="control">
                <input
                  className="input is-rounded"
                  min="0"
                  autoFocus
                  placeholder="Weight"
                  type="number"
                  value={weight || ""}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              <div className="control">
                <input
                  className="input"
                  min="0"
                  placeholder="Reps"
                  type="number"
                  value={reps || ""}
                  onChange={(e) => setReps(e.target.value)}
                />
              </div>
              <div className="control">
                <button
                  disabled={!weight || !reps}
                  className="button is-success"
                  type="submit"
                >
                  Submit
                </button>
              </div>
              <div className="control">
                <button
                  className="button is-danger is-rounded"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
      <div className="card-footer">
        <div className="card-footer-item">
          <button
            className="button is-info is-inverted"
            disabled={showForm}
            onClick={() => setShowForm(true)}
          >
            Add New Set
          </button>
        </div>
        <div className="card-footer-item">
          <button
            className="button is-danger is-inverted"
            onClick={() => handleDelete(exercise.id)}
          >
            Delete Exercise
          </button>
        </div>
      </div>
    </div>
  );
}
