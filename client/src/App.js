import React from 'react';
import './App.css';

import useStore from './customHooks/useStore';
import Home from './pages/home/Home';
import Cohort from './pages/cohort/Cohort';

import Footer from './commonComponents/footer/Footer';

function App() {
  const store = useStore();
  
  return (
    <div id="mainContainer">
      {store.page === 0 && (
        <Home
          store={store}
        />
      )}
      {store.page === 1 && (
        <Cohort
          store={store}
        />
      )}
      <Footer />
    </div>
  );
}

export default App;
