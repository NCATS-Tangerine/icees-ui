import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CircularProgess from '@material-ui/core/CircularProgress';

import './cohort.css';

import Header from './Header';
import FeatureAssociation from './FeatureAssociation';
import FeatureExploration from './FeatureExploration';
import ResultsTable from './resultsTable';
import CohortDialog from './CohortDialog';

function Cohort(props) {
  const { store } = props;
  const [tab, setTab] = useState(0);
  const [openCohorts, toggleCohorts] = useState(true);

  return (
    <div id="cohortContainer">
      <Header
        store={store}
        toggleCohorts={toggleCohorts}
      />
      <Paper id="cohortPaper">
        <Tabs
          value={tab}
          onChange={(e, v) => setTab(v)}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="One Feature Exploration" />
          <Tab label="Two Feature Association" />
        </Tabs>
        {!store.loadingCohort ? (
          <>
            <FeatureExploration
              tab={tab}
              store={store}
            />
            <FeatureAssociation
              tab={tab}
              store={store}
            />
            <ResultsTable
              tab={tab}
              store={store}
            />
          </>
        ) : (
          <div className="spinnerContainer">
            <CircularProgess size={200} thickness={6} className="centered" />
          </div>
        )}
      </Paper>
      <CohortDialog
        store={store}
        open={openCohorts}
        toggle={toggleCohorts}
      />
    </div>
  );
}

export default Cohort;
