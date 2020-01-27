const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1Ijoibm9lbC1qYW4iLCJhIjoiY2s1ZHcwejdiMjBpZjNkbzZmbWFvMG40YiJ9.oEZLRGRxxmwySK6uND_oXg&limit=1";
  console.log(url);
  request({ url, json: true }, (error, { body }) => {
    // console.log(url)
    if (error) {
      callback("Unable to connect to location services!", undefined); //Note: If we did not put in undefined, the function would run as it the 2nnd parameter would automatically become undefined
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
