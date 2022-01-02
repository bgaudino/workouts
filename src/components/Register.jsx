import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useAuth } from "../hooks/auth";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const auth = useAuth();
  const { signIn } = auth;
  const navigate = useNavigate();
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isValidEmail = email.match(emailRegex);
  const isValidPassword = password.length > 7;
  const isValidConfirmation = password === confirmation;

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/user/register/",
        {
          email,
          password,
          confirmation,
        }
      );
      if (res.status === 200) handleLogin();
    } catch (err) {
      setError(err.response?.data?.detail || "Something went wrong");
      setEmail("");
      setPassword("");
      setConfirmation("");
      setLoading(false);
    }
  }

  async function handleLogin() {
    try {
      const res = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/token/",
        {
          email,
          password,
        }
      );
      localStorage.setItem("accessToken", res.data.access);
      localStorage.setItem("refreshToken", res.data.refresh);
      await signIn();
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.detail || "Something went wrong");
      setEmail("");
      setPassword("");
      setConfirmation("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <section className="hero is-small is-info">
        <div className="hero-body">
          <p className="title has-text-centered">Register</p>
        </div>
      </section>
      <div className="container is-max-desktop p-6">
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Email</label>
            <div className="control has-icons-left">
              <input
                autoFocus
                className={isValidEmail ? "input is-success" : "input"}
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
              />
              <span className="icon is-small is-left">
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
            </div>
          </div>

          <div className="field">
            <label className="label">Password</label>
            <div className="control has-icons-left">
              <input
                className={isValidPassword ? "input is-success" : "input"}
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
              />
              <span className="icon is-small is-left">
                <FontAwesomeIcon icon={faLock} />
              </span>
            </div>
            {password && !isValidPassword && (
              <p className="help is-info">
                Password must be at least 8 characters
              </p>
            )}
          </div>

          <div className="field">
            <label className="label">Confirmation</label>
            <div className="control has-icons-left">
              <input
                className={
                  isValidConfirmation && isValidPassword
                    ? "input is-success"
                    : "input"
                }
                type="password"
                value={confirmation}
                onChange={(e) => {
                  setConfirmation(e.target.value);
                  setError("");
                }}
              />
              <span className="icon is-small is-left">
                <FontAwesomeIcon icon={faLock} />
              </span>
            </div>
            {!isValidConfirmation && (
              <p className="help is-danger">Passwords do not match</p>
            )}
            {error && <p className="help is-danger">{error}</p>}
          </div>

          <fieldset className="field">
            <div className="control">
              <button
                disabled={
                  !isValidEmail ||
                  !isValidPassword ||
                  !isValidConfirmation ||
                  loading
                }
                type="submit"
                className="button is-info is-fullwidth"
              >
                Register
              </button>
            </div>
          </fieldset>
        </form>
        <p className="has-text-centered mt-4">
          Already have an account?{" "}
          <Link to="/login" className="has-text-info">
            Login
          </Link>
        </p>
        {loading && <progress className="progress is-primary is-info mt-5" />}
      </div>
    </>
  );
}
