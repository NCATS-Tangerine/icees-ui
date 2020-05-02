import React, { useMemo } from 'react';

import AssociateTable from './AssociateTable';

export default function AssociateTableWrapper(props) {
  const { data } = props;

  const columns = useMemo(() => {
    if (!data) return [];
    const cols = [];
    cols.push({
      Header: () => null,
      id: 'feature_b_qualifiers',
      Cell: ({ row }) => {
        const qualifier = data.feature_b.feature_qualifiers[row.index];
        return (
          <span>
            {`${qualifier.operator} ${qualifier.value}`}
          </span>
        );
      },
    });
    data.feature_a.feature_qualifiers.forEach((qualifier, i) => {
      cols.push({
        Header: `${qualifier.operator} ${qualifier.value}`,
        accessor: (row) => row[i].frequency,
      });
    });
    return cols;
  }, [data]);

  return (
    <>
      {columns.length > 0 && (
        <AssociateTable
          data={data}
          columns={columns}
        />
      )}
    </>
  );
}
