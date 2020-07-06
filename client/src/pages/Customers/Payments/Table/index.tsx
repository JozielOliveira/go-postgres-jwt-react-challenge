import React, { useState } from 'react';
import {
  Table as TableBase,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Grid,
} from '@material-ui/core';
import { ArrowDropUp, ArrowDropDown } from '@material-ui/icons';

import PaymentIcon from 'react-payment-icons-inline';

import { PaymentMethodsByCustomerType } from 'services';

type TableType = {
  paymentMethods: PaymentMethodsByCustomerType[];
};

export const Table = ({ paymentMethods }: TableType) => {
  return (
    <>
      <TableBase>
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>Details</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Resitration Time</TableCell>
            <TableCell align="right" size="small">
              Show more
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!paymentMethods.length && (
            <TableRow>
              <TableCell align="center" colSpan={6}>
                None data
              </TableCell>
            </TableRow>
          )}
          {paymentMethods.map((paymentMethod) => (
            <Accordion key={paymentMethod.id} paymentMethod={paymentMethod} />
          ))}
        </TableBody>
      </TableBase>
    </>
  );
};

type AccordionType = {
  paymentMethod: PaymentMethodsByCustomerType;
};

const Accordion = ({ paymentMethod }: AccordionType) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <TableRow onClick={() => setShow(!show)}>
        <TableCell>{paymentMethod.methodType.toLocaleUpperCase()}</TableCell>
        <TableCell>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <PaymentIcon
                icon={paymentMethod.eWallet.toLocaleLowerCase()}
                style={{ margin: 0, width: 28 }}
              />
            </Grid>
            <Grid item xs={10}>
              {paymentMethod.cardBin} **** {paymentMethod.cardLastFour}
            </Grid>
          </Grid>
        </TableCell>
        <TableCell>{paymentMethod.BillingAddress.country}</TableCell>
        <TableCell>Success</TableCell>
        <TableCell>{paymentMethod.registration_time}</TableCell>
        <TableCell align="right" size="small">
          {show ? <ArrowDropUp /> : <ArrowDropDown />}
        </TableCell>
      </TableRow>
      {show && (
        <TableRow>
          <TableCell colSpan={6}>
            <p>Name on card: {paymentMethod.nameOnCard}</p>
            <p>
              Validad: {paymentMethod.expiryMonth} / {paymentMethod.expiryYear}
            </p>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};
