import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { workoutListUrl } from "../utils/endPoints";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

export default function Nav() {
  const [showMenu, setShowMenu] = useState(false);
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
            <p
              className="title is-4 has-text-white"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              Workout Tracker
            </p>
          </div>
          <div className="navbar-item">
            <button
              onClick={startWorkout}
              className="button is-dark desktop-link"
            >
              <FontAwesomeIcon icon={faPlusCircle} />
              &nbsp;Workout
            </button>
          </div>
          <div className="navbar-item desktop-link">
            <Link to="/">
              <button className="button is-dark">History</button>
            </Link>
          </div>
          <div className="navbar-item desktop-link">
            <Link to="/cardio">
              <button className="button is-dark">Cardio</button>
            </Link>
          </div>
          <div
            role="button"
            className={
              showMenu
                ? "navbar-burger mobile-menu is-active"
                : "navbar-burger mobile-menu"
            }
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
            onClick={() => setShowMenu(!showMenu)}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </div>
        </div>
        <div
          id="navbarBasicExample"
          className={
            showMenu
              ? "navbar-menu is-active mobile-menu"
              : "navbar-menu mobile-menu"
          }
        >
          <div className="navbar-start">
            <div className="navbar-item">
              <Link
                to={window.location.href}
                onClick={() => {
                  startWorkout();
                  setShowMenu(false);
                }}
              >
                New Workout
              </Link>
            </div>
            <div className="navbar-item">
              <Link to="/" onClick={() => setShowMenu(false)}>
                History
              </Link>
            </div>
            <div className="navbar-item">
              <Link to="/cardio" onClick={() => setShowMenu(false)}>
                Cardio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
