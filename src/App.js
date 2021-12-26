import "bulma/css/bulma.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WorkoutList from "./components/WorkoutList";
import Workout from "./components/Workout";
import Nav from "./components/Nav";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Nav />
        <div className="container is-max-desktop">
          <Routes>
            <Route path="/" element={<WorkoutList />}></Route>
            <Route path="/workout/:id" element={<Workout />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
