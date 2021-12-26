import { useState } from "react";
import { setCreateUrl, setDeleteUrl } from "../utils/endPoints";
import axios from "axios";

export default function Exercise({ exercise, handleDelete }) {
  const [myExercise, setMyExercise] = useState(exercise);
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

  return (
    <div>
      <h3>{exercise.exercise_name}</h3>
      <button onClick={() => handleDelete(exercise.id)}>Delete Exercise</button>
      {myExercise.sets.map((set, i) => (
        <div key={set.id}>
          <p>
            Set {i + 1}: {set.weight}lbs x {set.reps}
            <button onClick={() => deleteSet(set.id)}>X</button>
          </p>
        </div>
      ))}
      {showForm && (
        <form onSubmit={handleSubmit}>
          <input
            autoFocus
            min="0"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
          <input
            min="0"
            type="number"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
          />
          <button type="submit">Submit</button>
          <button onClick={() => setShowForm(false)}>Cancel</button>
        </form>
      )}
      <button onClick={() => setShowForm(true)}>Add New Set</button>
    </div>
  );
}
