import Map from "./Map";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faHeartbeat,
  faMountain,
  faRoad,
  faRunning,
  faTachometerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { formatDate, formatTime } from "../utils/formatDateTime";
import {
  formatDistance,
  formatDuration,
  getAveragePace,
} from "../utils/formatCardio";

export default function CardioSession({ workout }) {
  return (
    <div className="card m-5" key={workout.id}>
      <div className="card-header">
        <p className="card-header-title">
          {formatDate(workout.start_date)} {formatTime(workout.start_date)}:{" "}
          {workout.name}
        </p>
      </div>
      <div className="card-content">
        {workout.map?.summary_polyline && (
          <Map route={workout.map?.summary_polyline} />
        )}
        <div className="columns">
          <div className="column is-half">
            <p className="stats">
              <span className="tag is-info">
                <FontAwesomeIcon icon={faRoad} />
                &nbsp;Distance
              </span>
              {formatDistance(workout.distance)} miles
            </p>
          </div>
          <div className="column is-half">
            <p className="stats">
              <span className="tag is-info">
                <FontAwesomeIcon icon={faMountain} />
                &nbsp;Elevation Gain
              </span>
              {workout.total_elevation_gain} feet
            </p>
          </div>
        </div>
        <div className="columns">
          <div className="column is-half">
            <p className="stats">
              <span className="tag is-primary">
                <FontAwesomeIcon icon={faRunning} />
                &nbsp;Average Pace
              </span>
              {getAveragePace(workout.distance, workout.moving_time)} per mile
            </p>
          </div>
          <div className="column is-half">
            <p className="stats">
              <span className="tag is-primary">
                <FontAwesomeIcon icon={faClock} />
                &nbsp;Duration
              </span>
              {formatDuration(workout.moving_time)} minutes
            </p>
          </div>
        </div>
        <div className="columns">
          <div className="column is-half">
            <p className="stats">
              <span className="tag is-success">
                <FontAwesomeIcon icon={faTachometerAlt} />
                &nbsp;Avg Speed
              </span>
              {workout.average_speed} mph
            </p>
          </div>
          <div className="column is-half">
            <p className="stats">
              <span className="tag is-success">
                <FontAwesomeIcon icon={faTachometerAlt} />
                &nbsp; Max Speed
              </span>
              {workout.max_speed} mph
            </p>
          </div>
        </div>
        {workout.has_heartrate && (
          <div className="columns">
            <div className="column is-half">
              <p className="stats">
                <span className="tag is-danger">
                  <FontAwesomeIcon icon={faHeartbeat} />
                  &nbsp;Avg Heartrate
                </span>
                {workout.average_heartrate} bpm
              </p>
            </div>
            <div className="column is-half">
              <p className="stats">
                <span className="tag is-danger">
                  <FontAwesomeIcon icon={faHeartbeat} />
                  &nbsp;Max Heartrate
                </span>
                {workout.max_heartrate} bpm
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
