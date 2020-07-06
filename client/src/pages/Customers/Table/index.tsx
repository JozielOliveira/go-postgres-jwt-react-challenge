import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Table as TableBase,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
} from '@material-ui/core';
import { CustomerType } from 'services';

type TableType = {
  customers: CustomerType[];
};

export const Table = ({ customers }: TableType) => {
  const { push } = useHistory();

  return (
    <>
      <TableBase stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Telephone</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map((row) => (
            <TableRow
              key={row.customerID}
              hover
              onClick={() => push(`/customer/${row.customerID}`)}
            >
              <TableCell>{row.customerID}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.telephone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableBase>
    </>
  );
};
