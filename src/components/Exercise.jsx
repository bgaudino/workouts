export default function Exercise({ exercise, handleDelete }) {
  return (
    <div>
      <h3>{exercise.exercise_name}</h3>
      <button onClick={() => handleDelete(exercise.id)}>Delete</button>
      <button>Add New Set</button>
      {!exercise.sets.length && <p>No sets</p>}
      {exercise.sets.map((set, i) => (
        <div key={set.id}>
          <p>
            Set {i}: {set.weight} x {set.reps}
          </p>
        </div>
      ))}
    </div>
  );
}
