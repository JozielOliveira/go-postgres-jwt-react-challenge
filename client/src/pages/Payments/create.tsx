import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { Navbar } from 'components';
import { createPaymentmethods, LocationType } from 'services';

import { FixMeLate } from 'types';
import { FormCustomer, normalize } from './Form';

export const CreatePayment = () => {
  const [location, setLocation] = useState<LocationType>();
  const { push } = useHistory();
  const { id } = useParams();

  const handleCrateCustomer = async (params: FixMeLate) => {
    // eslint-disable-next-line radix
    const idCustomer = parseInt(id);
    await createPaymentmethods(
      normalize(idCustomer, { ...params, billingAddress: location })
    );
    push(`/customer/${id}`);
  };

  const handleMoveMarker = (position: FixMeLate) => setLocation(position);

  return (
    <>
      <Navbar />
      <FormCustomer
        context="Create"
        onMoveMarker={handleMoveMarker}
        onSubmit={handleCrateCustomer}
      />
    </>
  );
};
