export function formatDuration(seconds) {
  let minutes= Math.floor(seconds / 60);
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let remainingSeconds = seconds % 60;
  if (remainingSeconds < 10) {
    remainingSeconds = `0${remainingSeconds}`;
  }
  return `${minutes}:${remainingSeconds}`;
}

export function formatDistance(meters) {
  const miles = Number(meters) / 1609;
  return miles.toFixed(2);
}

export function getAveragePace(totalMeters, totalSeconds) {
  const totalMiles = formatDistance(totalMeters);
  const totalMinutes = totalSeconds / 60;
  const avg = totalMinutes / totalMiles;
  const avgMinutes = Math.floor(avg);
  const remainder = avg - avgMinutes;
  const avgSeconds = Math.round(60 * remainder);
  return `${avgMinutes}:${avgSeconds}`;
}