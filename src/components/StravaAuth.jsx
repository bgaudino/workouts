import { axiosInstance } from "../utils/axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { stravaAuthUrl } from "../utils/endPoints";

export default function StravaAuth() {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    window.history.replaceState(null, "", window.location.href.split("?")[0]);
    if (code) {
      axiosInstance.post(stravaAuthUrl, { code }).then((res) => {
        if (res.status === 200) navigate("/cardio");
      });
    } else {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="container p-5">
      <h2 className="title is-2 has-text-centered">Processing</h2>
      <progress className="progress is-primary" max="100">
        30%
      </progress>
    </div>
  );
}
