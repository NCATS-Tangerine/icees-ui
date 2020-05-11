import React, { useMemo } from 'react';
import IconButton from '@material-ui/core/IconButton';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
// import SortIcon from '@material-ui/icons/Sort';

import ExploreTable from './ExploreTable';

function onExpand(row, toggleAllRowsExpanded) {
  toggleAllRowsExpanded(false);
  row.toggleRowExpanded(!row.isExpanded);
}

export default function ExploreTableWrapper(props) {
  const { data } = props;

  const columns = useMemo(() => [
    {
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
    },
    {
      Header: 'Feature A',
      accessor: (row) => row.feature_a.feature_name,
      disableSortBy: true,
    },
    {
      Header: 'Feature B',
      accessor: (row) => row.feature_b.feature_name,
      disableSortBy: true,
    },
    {
      Header: 'P Value',
      accessor: 'p_value',
      sortType: 'basic',
    },
    {
      Header: 'Chi Squared',
      accessor: 'chi_squared',
      sortType: 'basic',
    },
  ], []);

  return (
    <>
      {data && (
        <ExploreTable
          columns={columns}
          data={data}
        />
      )}
    </>
  )
}
