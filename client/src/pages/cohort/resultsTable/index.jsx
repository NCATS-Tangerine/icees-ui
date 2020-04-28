import React, { useState, useEffect, useCallback } from 'react';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import './resultsTable.css';
import ResultsTable from './ResultsTable';
import SingleResultTable from './SingleResult';

function buildSingleTableSpec(tableInfo) {
  const columns = [];
  columns.push({
    Header: () => null,
    id: 'feature_b_qualifiers',
    Cell: ({ row }) => {
      const qualifier = tableInfo.feature_b.feature_qualifiers[row.index];
      return (
        <span>
          {`${qualifier.operator} ${qualifier.value}`}
        </span>
      );
    },
  });
  tableInfo.feature_a.feature_qualifiers.forEach((qualifier, i) => {
    columns.push({
      Header: `${qualifier.operator} ${qualifier.value}`,
      accessor: (row) => row[i].frequency,
    });
  });
  return columns;
}

function getSingleTableAxes(tableInfo) {
  const xAxis = tableInfo.feature_a.feature_name;
  const yAxis = tableInfo.feature_b.feature_name;
  return { xAxis, yAxis };
}

export default function ResultsTableWrapper(props) {
  const { store, tab } = props;
  const [exploreColumns, setExploreColumns] = useState([]);
  const [exploreResults, setExploreResults] = useState([]);
  const [associateColumns, setAssociateColumns] = useState([]);
  const [associateResults, setAssociateResults] = useState([]);

  useEffect(() => {
    if (tab === 0 && !store.exploreResponse && exploreColumns.length) {
      setExploreColumns([]);
      setExploreResults([]);
    }
    if (tab === 1 && !store.associateResponse && associateColumns.length) {
      setAssociateColumns([]);
      setAssociateResults([]);
    }
  }, [tab, store.loading]); // eslint-disable-line

  const onExpand = useCallback((row, toggleAllRowsExpanded) => {
    toggleAllRowsExpanded(false);
    row.toggleRowExpanded(!row.isExpanded);
  }, []);

  useEffect(() => {
    if (tab === 0 && store.exploreResponse && !exploreColumns.length) {
      const columns = [];
      columns.push({
        // Make an expander cell
        Header: () => null, // No header
        id: 'expander', // It needs an ID
        Cell: ({ row, toggleAllRowsExpanded }) => (
          // Use Cell to render an expander for each row.
          // We can use the getToggleRowExpandedProps prop-getter
          // to build the expander.
          <IconButton onClick={() => onExpand(row, toggleAllRowsExpanded)}>
            {row.isExpanded ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
          </IconButton>
        ),
      });
      columns.push({
        Header: 'Feature A',
        accessor: (row) => row.feature_a.feature_name,
        disableSortBy: true,
      });
      columns.push({
        Header: 'Feature B',
        accessor: (row) => row.feature_b.feature_name,
        disableSortBy: true,
      });
      columns.push({
        Header: 'P Value',
        accessor: 'p_value',
        sortType: 'basic',
      });
      columns.push({
        Header: 'Chi Squared',
        accessor: 'chi_squared',
        sortType: 'basic',
      });
      setExploreColumns(columns);
      setExploreResults(store.exploreResponse);
    }
    if (tab === 1 && store.associateResponse && !associateColumns.length) {
      const columns = buildSingleTableSpec(store.associateResponse);
      setAssociateColumns(columns);
      setAssociateResults(store.associateResponse.feature_matrix);
    }
  }, [tab, store.loading]); // eslint-disable-line

  return (
    <div id="resultsTableContainer">
      {!store.loading ? (
        <>
          {tab === 0 && (
            <>
              {exploreColumns.length > 0 && (
                <ResultsTable
                  columns={exploreColumns}
                  data={exploreResults}
                  buildSubComponent={buildSingleTableSpec}
                  getAxes={getSingleTableAxes}
                />
              )}
            </>
          )}
          {tab === 1 && (
            <>
              {associateColumns.length > 0 && (
                <SingleResultTable
                  columns={associateColumns}
                  data={associateResults}
                  axes={getSingleTableAxes(store.associateResponse)}
                />
              )}
            </>
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
