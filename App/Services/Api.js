// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import RNFetchBlob from 'react-native-fetch-blob';

import SuggestiesResponseHandler from '../Transforms/SuggestiesResponseHandler'
import env from './env';

// our "constructor"
const create = (baseURL = env.wpApiUri) => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  // future: place this in an .env or whatever. I know I shouldn't be placing this here, please don't steal it thanks
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache',
      'Authorization': env.wpApiToken,
    },
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

  // creating callback hell
  const createSuggestie = (suggestie) => {
    return new Promise((resolve) => {
      if (suggestie.image) {
        const imageUri = `RNFetchBlob-${suggestie.image.uri}`
        uploadImage(imageUri, (remoteImageURL) => {
          createPostWithACF(suggestie, remoteImageURL, () => {
            resolve();
          });
        });
      } else {
        createPostWithACF(suggestie, null, () => {
          resolve();
        });
      }
    });
  }
  const uploadImage = (imageUri, next) => {
    RNFetchBlob.fetch('post', `${baseURL}wp/v2/media`,
      {
        'Authorization': env.wpApiToken,
        'Content-Type': 'image/jpeg',
        'Content-Disposition': 'attachment; filename="photo.jpg"'
      }
      , imageUri)
      .then((responseImage) => {
        responseImageData = JSON.parse(responseImage.data);
        next(responseImageData.guid.rendered);
      })
      .catch(() => {
        next(null);
      })
  }
  const createPostWithACF = (suggestie, remoteImageURL, next) => {
    api.post('wp/v2/suggesties', { title: `${suggestie.type}: ${capitaliseFirstLetter(suggestie.titel)}`, status: 'publish' })
      .then((response) => {
        if (response.ok) {
          // use the id we got back to edit it to include the custom fields
          api.post(`acf/v3/suggesties/${response.data.id}`, { fields: { ...suggestie, imageuri: remoteImageURL } })
            .then((responseAcf) => {
              next();
            })
        } else {
          // future: show user an error message?
          next();
        }
      });
  }

  const googleApiKey = env.googleApiKey; // future: to .env or whatever. Please don't use this if you found it on GitHub k thanks :)
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
