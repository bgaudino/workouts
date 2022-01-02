import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { workoutListUrl } from "../utils/endPoints";
import { axiosInstance } from "../utils/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../hooks/auth";

export default function Nav() {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();
  const { user, isAuthenticated } = auth;

  async function startWorkout() {
    const res = await axiosInstance.post(workoutListUrl);
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
          {isAuthenticated ? (
            <>
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
              <div className="navbar-item desktop-link">
                <button className="button is-dark" onClick={auth.signOut}>
                  Logout{user ? `, ${user.first_name || user.email}` : ""}
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="navbar-item desktop-link">
                <Link to="/login">
                  <button className="button is-dark">Login</button>
                </Link>
              </div>
              <div className="navbar-item desktop-link">
                <Link to="/register">
                  <button className="button is-dark">Register</button>
                </Link>
              </div>
            </>
          )}
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
              ? "navbar-menu is-active mobile-menu has-background-dark"
              : "navbar-menu mobile-menu"
          }
        >
          <div className="navbar-start">
            {isAuthenticated ? (
              <>
                <div className="navbar-item">
                  <Link
                    className="button is-dark"
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
                  <Link
                    className="button is-dark"
                    to="/"
                    onClick={() => setShowMenu(false)}
                  >
                    History
                  </Link>
                </div>
                <div className="navbar-item">
                  <Link
                    className="button is-dark"
                    to="/cardio"
                    onClick={() => setShowMenu(false)}
                  >
                    Cardio
                  </Link>
                </div>
                <div className="navbar-item">
                  <button
                    className="button is-dark"
                    onClick={() => {
                      auth.signOut();
                      setShowMenu(false);
                    }}
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="navbar-item">
                  <Link
                    className="button is-dark"
                    to="/login"
                    onClick={() => setShowMenu(false)}
                  >
                    Login
                  </Link>
                </div>
                <div className="navbar-item">
                  <Link
                    className="button is-dark"
                    to="/register"
                    onClick={() => setShowMenu(false)}
                  >
                    Register
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
