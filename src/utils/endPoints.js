const baseUrl = process.env.REACT_APP_BACKEND_URL;

export const workoutListUrl = `${baseUrl}/workouts/`;
export const workoutUrl = (id) => `${baseUrl}/workout/${id}/`;
export const exerciseCreateUrl = `${baseUrl}/create_or_update/`;
export const exerciseUpdateUrl = `${baseUrl}/create_or_update/`;
export const exerciseUrl = (id) => `${baseUrl}/${id}/`;
export const exerciseDeleteUrl = (id) => `${baseUrl}/delete/${id}/`;