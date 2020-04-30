import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import './resultsTable.css';
import ExploreTable from './ExploreTableWrapper';
import AssociateTable from './AssociateTableWrapper';

export default function ResultsTable(props) {
  const { store, tab } = props;

  return (
    <div id="resultsTableContainer">
      {!store.loading ? (
        <>
          {tab === 0 && (
            <ExploreTable
              data={store.exploreResponse}
            />
          )}
          {tab === 1 && store.associateResponse && (
            <AssociateTable
              data={store.associateResponse}
            />
          )}
        </>
      ) : (
        <div className="spinnerContainer">
          <CircularProgress size={100} thickness={5} className="centered" />
        </div>
      )}
    </div>
  );
}
