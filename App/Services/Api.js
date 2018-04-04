// a library to wrap and simplify api calls
import apisauce from 'apisauce'

import SuggestiesResponseHandler from '../Transforms/SuggestiesResponseHandler'

import RNFetchBlob from 'react-native-fetch-blob';

// our "constructor"
const create = (baseURL = 'https://fluxit.be/react/nativemaps/wp-json/') => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache',
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvZmx1eGl0LmJlXC9yZWFjdFwvbmF0aXZlbWFwcyIsImlhdCI6MTUyMjMxMzU4NywibmJmIjoxNTIyMzEzNTg3LCJleHAiOjE1MjI5MTgzODcsImRhdGEiOnsidXNlciI6eyJpZCI6IjIifX19.OoKmeSIUagYHgD68iWisz_tyoncy5AsbJFNEu-27Tqg',
    }, // future: place this in an .env or whatever. I know I shouldn't be placing this here, please don't steal it thanks
    // 10 second timeout...
    timeout: 10000
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const capitaliseFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const getSuggesties = () => api.get('acf/v3/suggesties?per_page=100').then((response) => {
    if (response.ok) {
      return SuggestiesResponseHandler(response);
    }
  });

  const createSuggestie = (suggestie) => api
    // create the post with a title
    .post('wp/v2/suggesties', { title: `${suggestie.type}: ${capitaliseFirstLetter(suggestie.titel)}`, status: 'publish' })
    .then((response) => {
      if (response.ok) {
        return (
          // use the id we got back to edit it to include the custom fields
          api.post(`acf/v3/suggesties/${response.data.id}`, { fields: suggestie })
            .then((responseAcf) => {
              if (responseAcf.ok) {
                if (suggestie.image) {
                  // add the image
                  console.log(suggestie.image.uri);
                  /* const imageUri = RNFetchBlob.wrap(suggestie.image.uri) */
                  const imageUri = `RNFetchBlob-${suggestie.image.uri}`
                  console.log(imageUri);
                  RNFetchBlob.fetch('post', `${baseURL}wp/v2/media`,
                    {
                      'Content-Type': 'image/jpeg',
                      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvZmx1eGl0LmJlXC9yZWFjdFwvbmF0aXZlbWFwcyIsImlhdCI6MTUyMjMxMzU4NywibmJmIjoxNTIyMzEzNTg3LCJleHAiOjE1MjI5MTgzODcsImRhdGEiOnsidXNlciI6eyJpZCI6IjIifX19.OoKmeSIUagYHgD68iWisz_tyoncy5AsbJFNEu-27Tqg',
                      'Content-Disposition': 'attachment; filename="photo.jpg"'
                    }
                    , imageUri) // imageUri = RNFetchBlob.wrap(imageUri);
                    .then((response) => {
                      console.log(response); // returns a 201 response with id of the attached media
                    });

                  /* api.post(`wp/v2/media/`, { imageUri }, {
                    headers: {
                      'Content-Type': 'image/jpeg',
                      'Content-Disposition': `multipart/form-data; filename=photo.jpg`,
                    }
                  }).then(res => {
                    console.log(res)
                    return true;
                  }); */
                } else {
                  console.log("image adding failed");
                  return true;
                }
              } else {
                // future: show user an error message?
                return true;
              }
            })
        )
      } else {
        // future: show user an error message?
        return true;
      }
    });

  const googleApiKey = 'AIzaSyAvDH-7WmIYg__JkL4CPu9TqSbj3sW-B_k'; // future: to .env or whatever. Please don't use this if you found it on GitHub k thanks :)
  const reverseGeocode = (position) => api
    .post(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.latitude},${position.longitude}&key=${googleApiKey}`)
    .then((response) => {
      if (response.ok && response.data.status === "OK") {
        return (response.data.results[0].formatted_address);
      } else {
        return "";
      }
    });


  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    getSuggesties,
    createSuggestie,
    reverseGeocode
  }
}

// let's return back our create method as the default.
export default {
  create
}
