import "bulma/css/bulma.min.css";
import "./App.css";
import { useState, useLayoutEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WorkoutList from "./components/WorkoutList";
import Workout from "./components/Workout";
import Nav from "./components/Nav";
import StravaAuth from "./components/StravaAuth";
import CardioList from "./components/CardioList";
import Login from "./components/Login";
import AuthGuard from "./guards/AuthGuard";
import { useAuth } from "./hooks/auth";

function App() {
  const auth = useAuth();
  const [loading, setLoading] = useState(true);
  const { signIn } = auth;

  useLayoutEffect(() => {
    signIn().then(() => setLoading(false));
  }, [signIn]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route
            path="/"
            element={
              <AuthGuard>
                <WorkoutList />
              </AuthGuard>
            }
          ></Route>
          <Route
            path="/workout/:id"
            element={
              <AuthGuard>
                <Workout />
              </AuthGuard>
            }
          />
          <Route
            path="/strava-auth"
            element={
              <AuthGuard>
                <StravaAuth />
              </AuthGuard>
            }
          />
          <Route
            path="/cardio"
            element={
              <AuthGuard>
                <CardioList />
              </AuthGuard>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
