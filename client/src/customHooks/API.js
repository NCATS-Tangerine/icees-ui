import axios from 'axios';

function errorHandling(err) {
  /* eslint-disable no-console */
  let errorText = '';
  if (err.response) {
    console.log('Error Status', err.response.status);
    console.log('Error Downloading', err.response.data);
    errorText = err.response.data;
  } else if (err.request) {
    console.log('No response was received', err.request);
    errorText = 'There was no response from the server.';
  } else {
    console.log('Unknown Error', err.message);
    errorText = err.message;
  }
  return errorText;
  /* eslint-enable no-console */
}

const API = {
  getCohortDictionary: (args) => new Promise((resolve, reject) => {
    axios.request({
      method: 'POST',
      url: '/api/dictionary',
      data: args,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        const error = errorHandling(err);
        reject(error);
      })
  }),
  exploreFeature: (args) => new Promise((resolve, reject) => {
    axios.request({
      method: 'POST',
      url: '/api/explore',
      data: args,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        const error = errorHandling(err);
        reject(error);
      });
  }),
  associateFeatures: (args) => new Promise((resolve, reject) => {
    axios.request({
      method: 'POST',
      url: '/api/associate',
      data: args,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        const error = errorHandling(err);
        reject(error);
      });
  }),
  getCohortFeatures: (args) => new Promise((resolve, reject) => {
    axios.request({
      method: 'POST',
      url: '/api/cohort_features',
      data: args,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        const error = errorHandling(err);
        reject(error);
      });
  }),
};

export default API;
