import React, { useState } from 'react';
import './App.css';

import API from './API';
import Home from './pages/home/Home';
import Cohort from './pages/cohort/Cohort';

function App() {
  const [page, setPage] = useState(0);

  function getCohortDictionary(args) {
    setPage(1);
    // API.getCohortDictionary(args)
    //   .then((res) => {
    //     console.log('result', res);
    //     setPage(1);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     setPage(1);
    //   });
  }
  return (
    <div id="mainContainer">
      {page === 0 && (
        <Home
          submit={getCohortDictionary}
        />
      )}
      {page === 1 && (
        <Cohort />
      )}
    </div>
  );
}

export default App;
