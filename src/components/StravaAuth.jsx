import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { stravaAuthUrl } from "../utils/endPoints";

export default function StravaAuth() {
  const navigate = useNavigate();

  function authorizeStrava() {
    const url = new URL("https://www.strava.com/oauth/authorize");
    const params = {
      client_id: process.env.REACT_APP_STRAVA_CLIENT_ID,
      response_type: "code",
      redirect_uri: window.location.href,
      approval_prompt: "force",
      scope:
        "read,read_all,profile:read_all,profile:write,activity:read,activity:read_all,activity:write",
    };
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.append(key, value);
    }
    window.location.assign(url);
  }

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    window.history.replaceState(null, "", window.location.href.split("?")[0]);
    if (code) {
      codeForToken(code);
    }
  }, []);

  async function codeForToken(code) {
    const res = await axios.post(stravaAuthUrl, {
      code: code,
    });
    if (res.status === 200) navigate("/cardio");
  }

  return (
    <div>
      <button className="button is-primary" onClick={authorizeStrava}>
        Authorize
      </button>
    </div>
  );
}
