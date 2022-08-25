export function distanceFind(lat1, lon1, lat2, lon2, camp) {
  // haversine great circle distance approximation, returns meters
  let theta = lon1 - lon2;
  var dist =
    Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.cos(deg2rad(theta));
  dist = Math.acos(dist);
  dist = rad2deg(dist);
  dist = dist * 60; // 60 nautical miles per degree of seperation
  dist = dist * 1852; // 1852 meters per nautical mile
  return { ...camp, distance: dist }; //Return in meters
}

function deg2rad(deg) {
  return (deg * Math.PI) / 180.0;
}

function rad2deg(rad) {
  return (rad * 180.0) / Math.PI;
}
