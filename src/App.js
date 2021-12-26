import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import WorkoutList from "./components/WorkoutList";
import Workout from "./components/Workout";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Link to="/">
          <h1>Workout Tracker</h1>
        </Link>
        <Routes>
          <Route path="/" element={<WorkoutList />}></Route>
          <Route path="/workout/:id" element={<Workout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
