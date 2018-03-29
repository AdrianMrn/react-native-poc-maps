// a library to wrap and simplify api calls
import apisauce from 'apisauce'

import SuggestiesResponseHandler from '../Transforms/SuggestiesResponseHandler'

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
  const getSuggesties = () => api.get('acf/v3/suggesties?per_page=100').then((response) => {
    if (response.ok) {
      return SuggestiesResponseHandler(response);
    }
  });

  const createSuggestie = (suggestie) => api
    .post('wp/v2/suggesties', { title: `${suggestie.type}: ${suggestie.titel}`, status: 'publish' })
    .then((response) => {
      if (response.ok) {
        return (
          api.post(`acf/v3/suggesties/${response.data.id}`, { fields: suggestie })
            .then((response) => {
              if (response.ok) {
                return response.data;
              } else {
                // future: show error message?
              }
            })
        )
      } else {
        // future: show error message?
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
  }
}

// let's return back our create method as the default.
export default {
  create
}
