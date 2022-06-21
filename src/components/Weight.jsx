import React from 'react';
import WeightChart from './WeightChart';
import {axiosInstance} from '../utils/axios';
import {formatDateForInput} from '../utils/formatDateTime';

async function getWeighIns(date) {
  const res = await axiosInstance.get('/weight/');
  return res.data;
}

export default function Weight() {
  const [weighIns, setWeighIns] = React.useState([]);
  const [weight, setWeight] = React.useState(0);
  const [date, setDate] = React.useState(formatDateForInput(new Date()));
  const [newWeighIns, setNewWeighIns] = React.useState(0);

  const weighIn = React.useCallback(async () => {
    const res = await axiosInstance.post('/weight/', {
      weight,
      date,
    });
    return res.data;
  }, [weight, date]);

  function onSubmit(e) {
    e.preventDefault();
    weighIn({date, weight}).then((res) => setNewWeighIns((prev) => prev + 1));
  }

  React.useEffect(() => {
    getWeighIns().then((res) => {
      setWeighIns(res);
      if (newWeighIns === 0 && res.length > 0) {
        setWeight(res[0].weight);
      }
    });
  }, [newWeighIns]);

  return (
    <>
      <section className="hero is-small is-primary">
        <div className="hero-body">
          <p className="title has-text-centered">Weight</p>
        </div>
      </section>
      <div className="container is-max-desktop">
        <div className="box m-5">
          <h3 className="is-size-5 mb-3">Weigh In</h3>
          <form onSubmit={onSubmit}>
            <div className="field">
              <label className="label">Date</label>
              <div className="control">
                <input
                  name="date"
                  className="input"
                  value={date}
                  type="date"
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Weight</label>
              <div className="control">
                <input
                  name="date"
                  className="input"
                  value={weight}
                  type="decimal"
                  inputMode="decimal"
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
            </div>
            <button type="submit" className="button is-primary">
              Weigh In
            </button>
          </form>
        </div>
        <div
          style={{
            height: '400px',
            width: '100%',
            padding: '20px',
          }}
        >
          <WeightChart data={weighIns} />
        </div>

        <div className="box m-5">
          <h3 className="is-size-5 mb-3">Totals</h3>
          <table className="table is-fullwidth">
            <thead>
              <tr>
                <th>Date</th>
                <th>Weight</th>
              </tr>
            </thead>
            <tbody>
              {weighIns.map((weighIn) => (
                <tr key={weighIn.id}>
                  <td>{weighIn.date}</td>
                  <td>{weighIn.weight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
