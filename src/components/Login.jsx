import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { tokenUrl } from "../utils/endPoints";
import { axiosInstance } from "../utils/axios";
import { useAuth } from "../hooks/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const auth = useAuth();
  const { signIn } = auth;
  const navigate = useNavigate();
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isValidEmail = email.match(emailRegex);
  const isValidPassword = password.length > 7;

  function handleSubmit(e) {
    e.preventDefault();
    axiosInstance
      .post(tokenUrl, {
        email,
        password,
      })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("accessToken", res.data.access);
          localStorage.setItem("refreshToken", res.data.refresh);
          signIn().then(() => navigate("/"));
        } else {
          setError(res.response?.data?.detail || "Something went wrong");
          setEmail("");
          setPassword("");
        }
      })
      .catch((err) => {
        setError(err.response?.data?.detail || "Something went wrong");
        setEmail("");
        setPassword("");
      });
  }

  return (
    <>
      <section className="hero is-small is-info">
        <div className="hero-body">
          <p className="title has-text-centered">Login</p>
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
                className="input"
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
            {error && <p className="help is-danger">{error}</p>}
          </div>

          <fieldset className="field">
            <div className="control">
              <button
                disabled={!isValidEmail || !isValidPassword}
                type="submit"
                className="button is-info is-fullwidth"
              >
                Login
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </>
  );
}
