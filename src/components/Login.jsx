import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { tokenUrl } from "../utils/endPoints";
import { axiosInstance } from "../utils/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const emailRegex =
    "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$";
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
        console.log(res);
        localStorage.setItem("accessToken", res.data.access);
        localStorage.setItem("refreshToken", res.data.refresh);
      })
      .catch((err) => {
        setError(err.response?.data?.detail || "Something went wrong");
        setEmail("");
        setPassword("");
      });
  }

  return (
    <div className="container is-max-desktop p-6">
      <form onSubmit={handleSubmit}>
        <div class="field">
          <label class="label">Email</label>
          <div class="control has-icons-left">
            <input
              autoFocus
              className={isValidEmail ? "input is-success" : "input"}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span class="icon is-small is-left">
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
          </div>
        </div>

        <div class="field">
          <label class="label">Password</label>
          <div class="control has-icons-left">
            <input
              class="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span class="icon is-small is-left">
              <FontAwesomeIcon icon={faLock} />
            </span>
          </div>
          {error && <p className="help is-danger">{error}</p>}
        </div>

        <fieldset class="field">
          <div class="control">
            <button
              disabled={!isValidEmail || !isValidPassword}
              type="submit"
              class="button is-link is-fullwidth"
            >
              Login
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
