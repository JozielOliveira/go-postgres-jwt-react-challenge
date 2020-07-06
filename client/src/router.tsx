import React from 'react';
import { RouteType } from 'hooks';
import {
  Login,
  Register,
  Costumers,
  CreateCustomer,
  EditCustomer,
  DetailsCustomer,
  CreatePayment,
} from 'pages';

export const routes: RouteType[] = [
  {
    name: 'Login',
    path: '/',
    exact: true,
    isPrivate: false,
    component: () => <Login />,
  },
  {
    name: 'Register',
    path: '/register',
    exact: true,
    isPrivate: false,
    component: () => <Register />,
  },
  {
    name: 'Customers',
    path: '/customers',
    exact: true,
    isPrivate: true,
    component: () => <Costumers />,
  },
  {
    name: 'Details Customer',
    path: '/customer/:id',
    exact: true,
    isPrivate: true,
    component: () => <DetailsCustomer />,
  },
  {
    name: 'Create Customer',
    path: '/create-customer',
    exact: true,
    isPrivate: true,
    component: () => <CreateCustomer />,
  },
  {
    name: 'Edit Customer',
    path: '/edit-customer/:id',
    exact: true,
    isPrivate: true,
    component: () => <EditCustomer />,
  },
  {
    name: 'Create Payments',
    path: '/create-payment/:id',
    exact: true,
    isPrivate: true,
    component: () => <CreatePayment />,
  },
];
