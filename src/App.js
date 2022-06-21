import 'bulma/css/bulma.min.css';
import './App.css';
import {useState, useLayoutEffect} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import WorkoutList from './components/WorkoutList';
import Workout from './components/Workout';
import Diet from './components/Diet';
import Weight from './components/Weight';
import Nav from './components/Nav';
import StravaAuth from './components/StravaAuth';
import CardioList from './components/CardioList';
import Login from './components/Login';
import Register from './components/Register';
import Loading from './components/Loading';
import AuthGuard from './guards/AuthGuard';
import {useAuth} from './hooks/auth';
import Map from './components/Map';

function App() {
  const auth = useAuth();
  const {signIn} = auth;
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    signIn().then(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loading />;

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
          <Route
            path="/diet"
            element={
              <AuthGuard>
                <Diet />
              </AuthGuard>
            }
          />
          <Route
            path="/weight"
            element={
              <AuthGuard>
                <Weight />
              </AuthGuard>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/map" element={<Map />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
