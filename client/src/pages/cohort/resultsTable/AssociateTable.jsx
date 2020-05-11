import React from 'react';
import { useTable } from 'react-table';
import MuiTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import EmptyTable from './EmptyTable';

export default function AssociateTable(props) {
  const { data, columns } = props;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    visibleColumns,
  } = useTable({ columns, data: data.feature_matrix });

  return (
    <div className="singleResultTable">
      <h5 className="xAxisTitle">{data.feature_a.feature_name}</h5>
      <h5 className="yAxisTitle">{data.feature_b.feature_name}</h5>
      <MuiTable {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableCell {...column.getHeaderProps()}>
                  {column.render('Header')}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.length ? rows.map((row, i) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <TableCell {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </TableCell>
                ))}
              </TableRow>
            );
          }) : (
            <EmptyTable
              numRows={10}
              numCells={visibleColumns.length}
            />
          )}
        </TableBody>
      </MuiTable>
      {!rows.length > 0 && (
        <div id="emptyTableOverlay">No Results</div>
      )}
    </div>
  );
}
