import axios from "axios";
import stravaConnectButton from "../images/stravaConnectButton.png";
import poweredByStrava from "../images/poweredByStrava.png";
import { useState, useEffect } from "react";
import { cardioListUrl } from "../utils/endPoints";
import {
  formatDistance,
  formatDuration,
  getAveragePace,
} from "../utils/formatCardio";
import { formatDate, formatTime } from "../utils/formatDateTime";

export default function CardioList() {
  const [loading, setLoading] = useState(true);
  const [workouts, setWorkouts] = useState([]);
  const [accounts, setAccounts] = useState([]);

  function authorizeStrava() {
    const url = new URL("https://www.strava.com/oauth/authorize");
    const params = {
      client_id: process.env.REACT_APP_STRAVA_CLIENT_ID,
      response_type: "code",
      redirect_uri: process.env.REACT_APP_STRAVA_REDIRECT_URI,
      approval_prompt: "force",
      scope:
        "read,read_all,profile:read_all,profile:write,activity:read,activity:read_all,activity:write",
    };
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.append(key, value);
    }
    return url.href;
  }

  useEffect(() => {
    axios
      .get(cardioListUrl)
      .then((res) => {
        setWorkouts(() => res.data.cardio_sessions);
        setAccounts(() => res.data.strava_accounts);
        setLoading(() => false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (loading) return null;

  return (
    <>
      <section className="hero is-small is-primary">
        <div className="hero-body">
          <p className="title has-text-centered">Cardio</p>
        </div>
      </section>
      <div className="container is-max-desktop">
        <div className="card m-5">
          <div className="card-header">
            <img
              className="image m-2"
              style={{ height: 48 }}
              src={poweredByStrava}
              alt="Powered by Strava"
            />
          </div>
          <div className="card-content">
            {accounts.length > 0 ? (
              accounts.map((account) => (
                <>
                  <div className="media">
                    <div className="media-left">
                      <figure className="image is-48x48">
                        <img src={account.avatar} alt="Avatar" />
                      </figure>
                    </div>
                    <div className="media-content">
                      <p className="title is-4">
                        {account.first_name} {account.last_name}
                      </p>
                      <p className="subtitle is-6">@{account.username}</p>
                    </div>
                  </div>
                </>
              ))
            ) : (
              <p>
                No accounts linked. Click "Connect with Strava" below to link a
                new account.
              </p>
            )}
          </div>
          <div className="card-footer p-2 is-justify-content-right">
            <a href={authorizeStrava()} style={{ float: "right" }}>
              <img
                src={stravaConnectButton}
                style={{ height: 48 }}
                alt="Connect with Strava"
              />
            </a>
          </div>
        </div>

        {workouts.map((workout) => (
          <div className="card m-5" key={workout.id}>
            <div className="card-header">
              <p className="card-header-title">
                {formatDate(workout.start_date)}{" "}
                {formatTime(workout.start_date)}: {workout.name}
              </p>
            </div>
            <div className="card-content">
              <p>
                <strong>Distance: </strong>
                {formatDistance(workout.distance)} miles
              </p>
              <p>
                <strong>Duration: </strong>
                {formatDuration(workout.moving_time)} minutes
              </p>
              <p>
                <strong>Average Pace: </strong>
                {getAveragePace(workout.distance, workout.moving_time)} minutes
                per mile
              </p>
              <p>
                <strong>Avg Speed: </strong>
                {workout.average_speed} mph
              </p>
              <p>
                <strong>Max Speed: </strong>
                {workout.max_speed} mph
              </p>
              {workout.has_heartrate && (
                <>
                  <p>
                    <strong>Avg Heartrate: </strong>
                    {workout.average_heartrate} bpm
                  </p>
                  <p>
                    <strong>Max Heartrate: </strong>
                    {workout.max_heartrate} bpm
                  </p>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
