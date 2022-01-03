import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { workoutListUrl } from "../utils/endPoints";
import { axiosInstance } from "../utils/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../hooks/auth";
import { useDetectClickOutside } from "react-detect-click-outside";

export default function Nav() {
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();
  const { user, isAuthenticated } = auth;
  const navRef = useDetectClickOutside({
    onTriggered: () => {
      setShowMenu(false);
    },
  });
  const dropdownRef = useDetectClickOutside({
    onTriggered: () => {
      setShowDropdown(false);
    },
  });

  async function startWorkout() {
    const res = await axiosInstance.post(workoutListUrl);
    navigate(`/workout/${res.data.id}`);
  }

  return (
    <nav
      ref={navRef}
      className="navbar is-dark"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand" style={{ width: "100%" }}>
          <div className="navbar-item">
            <p
              className="title is-4 has-text-white"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              Workout Tracker
            </p>
          </div>
          {isAuthenticated && (
            <>
              <div className="navbar-item desktop-link">
                <a
                  href
                  role="button"
                  onClick={startWorkout}
                  className="has-text-white"
                >
                  <FontAwesomeIcon icon={faPlusCircle} />
                  &nbsp;Workout
                </a>
              </div>
              <div className="navbar-item desktop-link">
                <Link className="has-text-white" to="/">
                  History
                </Link>
              </div>
              <div className="navbar-item desktop-link">
                <Link className="has-text-white" to="/cardio">
                  Cardio
                </Link>
              </div>
            </>
          )}
          <div className="navbar-end desktop-link" ref={dropdownRef}>
            <div className="navbar-item">
              <div className={showDropdown ? "dropdown is-active" : "dropdown"}>
                <div className="dropdown-trigger">
                  <a
                    href
                    className="has-text-white"
                    aria-controls="dropdown-menu"
                    onClick={() => setShowDropdown((prevState) => !prevState)}
                  >
                    <FontAwesomeIcon icon={faUserCircle} />
                    {isAuthenticated ? (
                      <>&nbsp;{user.first_name || user.email}</>
                    ) : (
                      <>&nbsp;Guest</>
                    )}
                  </a>
                </div>
                <div className="dropdown-menu" id="dropdown-menu" role="menu">
                  <div className="dropdown-content has-background-dark">
                    {isAuthenticated ? (
                      <div className="dropdown-item">
                        <button
                          href
                          className="button is-dark"
                          onClick={() => {
                            auth.signOut();
                            setShowDropdown(false);
                          }}
                        >
                          Logout
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="dropdown-item">
                          <Link
                            to="/login"
                            className="button is-dark"
                            onClick={() => setShowDropdown(false)}
                          >
                            Login
                          </Link>
                        </div>
                        <div className="dropdown-item">
                          <Link
                            to="/register"
                            className="button is-dark"
                            onClick={() => setShowDropdown(false)}
                          >
                            Register
                          </Link>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
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
