const baseUrl = process.env.REACT_APP_BACKEND_URL;

export const workoutListUrl = "/exercise/workouts/";
export const workoutUrl = (id) => `/exercise/workout/${id}/`;
export const exerciseCreateUrl = "/exercise/create_or_update/";
export const exerciseUpdateUrl = "/exercise/create_or_update/";
export const exerciseUrl = (id) => `/exercise/${id}/`;
export const exerciseDeleteUrl = (id) => `/exercise/delete/${id}/`;
export const setCreateUrl = "/exercise/set/create_or_update/";
export const setDeleteUrl = (id) => `/exercise/set/delete/${id}/`;
export const stravaAuthUrl = "/exercise/strava-auth/";
export const cardioListUrl = "/exercise/cardio/";
export const tokenUrl = "/token/";
