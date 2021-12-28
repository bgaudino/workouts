import { Link, useNavigate } from "react-router-dom";
import { workoutListUrl } from "../utils/endPoints";
import axios from "axios";

export default function Nav() {
  const navigate = useNavigate();

  async function startWorkout() {
    const res = await axios.post(workoutListUrl);
    navigate(`/workout/${res.data.id}`);
  }

  return (
    <nav
      className="navbar is-dark"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <div className="navbar-item">
            <Link to="/">
              <button className="button is-dark"> Workout Tracker</button>
            </Link>
          </div>
          <div className="navbar-item">
            <button onClick={startWorkout} className="button is-dark">
              New Workout
            </button>
          </div>
          {/* <div
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </div> */}
        </div>
      </div>
    </nav>
  );
}
