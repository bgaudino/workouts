import React, { useState, useEffect } from "react";
import { axiosInstance } from "../utils/axios";
import Select from "react-select";

const initialFormData = {
  name: "",
  calories: "",
  fat: "",
  protein: "",
  fat: "",
  carbs: "",
};

export default function Diet() {
  const [consumedFood, setConsumedFood] = useState([]);
  const [nutrition, setNutrition] = useState({});
  const [foodOptions, setFoodOptions] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [consumedFoodAdds, setConsumedFoodAdds] = useState(0);
  const [foodAdds, setFoodAdds] = useState(0);
  const [foodValue, setFoodValue] = useState(0);
  const [date, setDate] = useState(formatDate());

  useEffect(() => {
    axiosInstance.get(`diet/${date}/`).then((res) => {
      setConsumedFood(res.data.food);
      setNutrition(res.data.nutrition);
    });
  }, [consumedFoodAdds, date]);

  useEffect(() => {
    axiosInstance.get("diet/food/").then((res) => {
      setFoodOptions(res.data.map((f) => ({ value: f.id, label: f.name })));
    });
  }, [foodAdds]);

  function updateFormData(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function onSubmit(e) {
    e.preventDefault();
    axiosInstance.post("diet/food/", formData).then((res) => {
      setFormData(initialFormData);
      setFoodAdds((prev) => prev + 1);
    });
  }

  function deleteConsumedFood(id) {
    axiosInstance
      .delete(`diet/${id}/`)
      .then((res) => setConsumedFoodAdds((prev) => prev + 1));
  }

  function formatDate(date) {
    const d = date ? new Date(date) : new Date();
    const year = d.getFullYear();
    const day = twoDigits(d.getDate());
    const month = twoDigits(d.getMonth() + 1);
    return `${year}-${month}-${day}`;
  }

  function twoDigits(number) {
    if (number < 10) return `0${number}`;
    return number;
  }

  function record(e) {
    e.preventDefault();
    const data = {
      food: foodValue,
      date: date,
    };
    axiosInstance.post("diet/create/", data).then((res) => {
      console.log(res);
      setConsumedFoodAdds((prev) => prev + 1);
    });
  }

  return (
    <>
      <section className="hero is-small is-primary">
        <div className="hero-body">
          <p className="title has-text-centered">Diet</p>
        </div>
      </section>
      <div className="container is-max-desktop">
        <div className="box m-5">
          <h3 className="is-size-5 mb-3">Date</h3>
          <input
            className="input mb-3"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="box m-5">
          <h3 className="is-size-5 mb-3">Totals</h3>
          <table className="table is-fullwidth">
            <thead>
              <tr>
                <th>Calories</th>
                <th>Fat</th>
                <th>Protein</th>
                <th>Carbs</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{nutrition.calories || 0}</td>
                <td>{nutrition.fat || 0}g</td>
                <td>{nutrition.protein || 0}g</td>
                <td>{nutrition.carbs || 0}g</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="box m-5">
          <form onSubmit={record}>
            <h3 className="is-size-5 mb-3">Record</h3>
            <Select
              options={foodOptions}
              onChange={(newValue, action) => {
                setFoodValue(newValue.value);
              }}
              className="mb-3"
            />
            <button
              type="submit"
              className="button is-primary"
              disabled={foodValue === 0}
            >
              Record
            </button>
          </form>
        </div>
        <div class="box m-5">
          <h3 className="is-size-5 mb-3">Recorded Food</h3>
          <table className="table is-hoverable is-fullwidth">
            <thead>
              <tr>
                <th>Food</th>
                <th>Calories</th>
                <th>Fat</th>
                <th>Protein</th>
                <th>Carbs</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {consumedFood.map((food) => (
                <tr key={food.id}>
                  <td>{food.name}</td>
                  <td>{food.calories}</td>
                  <td>{food.fat}g</td>
                  <td>{food.protein}g</td>
                  <td>{food.carbs}g</td>
                  <td>
                    <button
                      className="button is-danger"
                      onClick={() => deleteConsumedFood(food.id)}
                    >
                      &times;
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {consumedFood.length === 0 && <p>No food recorded yet.</p>}
        </div>
        <div className="box m-5">
          <h3 className="is-size-5 mb-3">Add New Food Option</h3>
          <form onSubmit={onSubmit}>
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input
                  name="name"
                  className="input"
                  value={formData.name}
                  type="text"
                  onChange={updateFormData}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Calories</label>
              <div className="control">
                <input
                  name="calories"
                  className="input"
                  value={formData.calories}
                  inputMode="numeric"
                  type="number"
                  onChange={updateFormData}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Fat</label>
              <div className="control">
                <input
                  name="fat"
                  className="input"
                  value={formData.fat}
                  type="decimal"
                  inputMode="numeric"
                  onChange={updateFormData}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Protein</label>
              <div className="control">
                <input
                  name="protein"
                  className="input"
                  value={formData.protein}
                  type="decimal"
                  inputMode="numeric"
                  onChange={updateFormData}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Carbs</label>
              <div className="control">
                <input
                  name="carbs"
                  className="input"
                  value={formData.carbs}
                  type="decimal"
                  inputMode="numeric"
                  onChange={updateFormData}
                />
              </div>
            </div>
            <button className="button is-primary" type="submit">
              Add
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
