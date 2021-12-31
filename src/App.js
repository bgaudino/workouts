import "bulma/css/bulma.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WorkoutList from "./components/WorkoutList";
import Workout from "./components/Workout";
import Nav from "./components/Nav";
import StravaAuth from "./components/StravaAuth";
import CardioList from "./components/CardioList";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<WorkoutList />}></Route>
          <Route path="/workout/:id" element={<Workout />} />
          <Route path="/strava-auth" element={<StravaAuth />} />
          <Route path="/cardio" element={<CardioList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
