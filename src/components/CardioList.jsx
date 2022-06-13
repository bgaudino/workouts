import stravaConnectButton from "../images/stravaConnectButton.png";
import poweredByStrava from "../images/poweredByStrava.png";
import { useState, useEffect } from "react";
import { cardioListUrl } from "../utils/endPoints";
import { axiosInstance } from "../utils/axios";
import CardioSession from "./CardioSession";
import {
  formatDistance,
  formatDuration,
  getAveragePace,
} from "../utils/formatCardio";

export default function CardioList() {
  const [loading, setLoading] = useState(true);
  const [workouts, setWorkouts] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [weeklyStats, setWeeklyStats] = useState({});
  const [monthlyStats, setMonthlyStats] = useState({});
  const [yearlyStats, setYearlyStats] = useState({});
  const [displayedStats, setDisplayedStats] = useState({});
  const [count, setCount] = useState(0);
  const pageNumbers = count > 0 ? Math.ceil(count / 10) : 0;
  let pages = [];
  for (let i = 0; i < pageNumbers; i++) {
    pages.push(i + 1);
  }
  const [offset, setOffset] = useState(0);

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
    axiosInstance
      .get(cardioListUrl + "?offset=" + offset)
      .then((res) => {
        console.log(res.data);
        setWorkouts(() => res.data.cardio_sessions);
        setAccounts(() => res.data.strava_accounts);
        setCount(() => res.data.count);
        setWeeklyStats(() => res.data.weekly_stats);
        setDisplayedStats(() => res.data.weekly_stats);
        setMonthlyStats(() => res.data.monthly_stats);
        setYearlyStats(() => res.data.yearly_stats);
        setLoading(() => false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [offset]);

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
                <div key={account.id} className="media">
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
        <div className="box m-5">
          <h3
            className="is-size-5 mb-3"
            style={{
              textAlign: "center",
            }}
          >
            Stats
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1rem",
            }}
          >
            <button
              className={
                displayedStats === weeklyStats ? "button is-info" : "button"
              }
              onClick={() => setDisplayedStats(weeklyStats)}
            >
              Week
            </button>
            <button
              className={
                displayedStats === monthlyStats ? "button is-info" : "button"
              }
              onClick={() => setDisplayedStats(monthlyStats)}
            >
              Month
            </button>
            <button
              className={
                displayedStats === yearlyStats ? "button is-info" : "button"
              }
              onClick={() => setDisplayedStats(yearlyStats)}
            >
              Year
            </button>
          </div>

          <div className="mt-3">
            <strong>Runs: </strong>
            {displayedStats.runs}
          </div>
          <div>
            <strong>Distance: </strong>
            {formatDistance(displayedStats.distance)} miles
          </div>
          <div>
            <strong>Duration: </strong>
            {formatDuration(displayedStats.duration)}
          </div>
          <div>
            <strong>Avg Pace: </strong>
            {getAveragePace(displayedStats.distance, displayedStats.duration)}
          </div>
        </div>
        {count > 0 && (
          <div className="container p-5">
            <nav
              className="pagination"
              role="navigation"
              aria-label="pagination"
            >
              <button
                className="button pagination-previous"
                disabled={offset === 0}
                onClick={() => {
                  if (offset > 0) setOffset(offset - 1);
                }}
              >
                Previous
              </button>
              <button
                className="button pagination-next"
                disabled={offset === pageNumbers - 1}
                onClick={() => {
                  if (offset < pageNumbers - 1) setOffset(offset + 1);
                }}
              >
                Next page
              </button>
              <ul className="pagination-list">
                {pages.map((page, index) => {
                  if (pageNumbers <= 5) {
                    return (
                      <li
                        key={index}
                        className={
                          offset === index
                            ? "pagination-link is-current"
                            : "pagination-link"
                        }
                        onClick={() => setOffset(index)}
                      >
                        {page}
                      </li>
                    );
                  }
                  if (
                    (offset < 3 && index < 3) ||
                    index === 0 ||
                    index === pageNumbers - 1 ||
                    index === offset
                  ) {
                    return (
                      <li>
                        <button
                          className={
                            offset === page - 1
                              ? "button pagination-link is-current"
                              : "button pagination-link"
                          }
                          aria-label={`Goto page ${page}`}
                          onClick={() => setOffset(page - 1)}
                        >
                          {page}
                        </button>
                      </li>
                    );
                  }
                  if (
                    (offset < 3 && index === 3) ||
                    index === offset + 1 ||
                    index === offset - 1
                  ) {
                    return (
                      <li>
                        <span className="pagination-ellipsis">&hellip;</span>
                      </li>
                    );
                  }
                  return null;
                })}
              </ul>
            </nav>
          </div>
        )}
        {!workouts.length && (
          <div className="container p-5 has-text-centered">
            <p>No cardio sessions found.</p>
          </div>
        )}
        {workouts.map((workout) => (
          <CardioSession workout={workout} />
        ))}
      </div>
    </>
  );
}
