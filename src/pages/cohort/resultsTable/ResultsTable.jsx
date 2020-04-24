import React, { useEffect } from 'react';
import { useTable, useExpanded, usePagination, useSortBy } from 'react-table';
import MuiTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
// import SortIcon from '@material-ui/icons/Sort';

import './resultsTable.css';
import SingleResultTable from './SingleResult';

export default function ResultsTable(props) {
  const { columns, data, buildSubComponent, getAxes } = props;
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
    visibleColumns,
    state: { expanded },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
        sortBy: [
          {
            id: 'p_value',
            desc: false,
          },
          {
            id: 'feature_a',
            canSort: false,
          },
          {
            id: 'feature_b',
            canSort: false,
          },
        ],
      },
    },
    // these NEED to be in this order
    useSortBy,
    useExpanded,
    usePagination,
  );

  useEffect(() => {
    console.log('expanded', expanded);
  }, [expanded]);

  return (
    <div id="resultsTable">
      <MuiTable {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableCell {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (' 🔽') : (' 🔼')
                    ) : (
                      ''
                    )}
                  </span>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <React.Fragment key={`results-table-row-${i}`}>
                <TableRow {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <TableCell {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </TableCell>
                  ))}
                </TableRow>
                {row.isExpanded ? (
                  <tr>
                    <td colSpan={visibleColumns.length} className="expandedRow">
                      <SingleResultTable
                        columns={buildSubComponent(row.original)}
                        data={row.original.feature_matrix}
                        axes={getAxes(row.original)}
                      />
                    </td>
                  </tr>
                ) : null}
              </React.Fragment>
            );
          })}
        </TableBody>
      </MuiTable>
      <div className="pagination">
        <Button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          variant="contained"
        >
          Previous
        </Button>
        <div>
          Page
          <input
            type="number"
            value={pageIndex + 1}
            min={1}
            max={pageCount}
            onChange={(e) => {
              const pageInd = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(pageInd);
            }}
            style={{ width: '100px' }}
          />
          {`of ${pageCount}`}
        </div>
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pSize) => (
            <option key={pSize} value={pSize}>
              {`Show ${pSize}`}
            </option>
          ))}
        </select>
        <Button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          variant="contained"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
