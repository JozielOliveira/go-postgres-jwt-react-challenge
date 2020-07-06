import { api } from './index';

export type LocationType = {
  country: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  addresseeName: string;
  street1: string;
  neighborhood: string;
  zone: string;
  city: string;
  region: string;
  poBoxNumber: string;
};

export type CustomerBaseType = {
  email: string;
  name: string;
  familyName: string;
  givenName: string;
  telephone: string;
  telephoneCountry: string;
};

export type CustomerType = CustomerBaseType & {
  customerID: string;
  registrationTime: number;
  emailVerifiedTime: number;
  telephoneVerifiedTime: number;
  Location: LocationType;
};

type CreateCustomerType = { customerID: string };

export const createCustomer = async (
  params: CustomerBaseType
): Promise<CreateCustomerType> => {
  try {
    const { data } = await api.post<CreateCustomerType>('/customers', params);

    return data;
  } catch (error) {
    return error;
  }
};

type CustomersType = {
  customers: CustomerType[];
};

export const getCustomers = async (): Promise<CustomersType> => {
  try {
    const { data } = await api.get<CustomersType>('/customers');

    return data;
  } catch (error) {
    return error;
  }
};

export const getCustomersById = async (id: string): Promise<CustomerType> => {
  try {
    const { data } = await api.get<{ customer: CustomerType }>(
      `/customers/${id}`
    );

    return data.customer;
  } catch (error) {
    return error;
  }
};

export type PaymentMethodsByCustomerType = {
  id: number;
  // eslint-disable-next-line camelcase
  location_id: number;
  BillingAddress: {
    id: number;
    latitude: number;
    longitude: number;
    country: string;
    street1: string;
  };
  customerId: number;
  // eslint-disable-next-line camelcase
  registration_time: string;
  methodType: string;
  cardBin: string;
  cardLastFour: string;
  expiryMonth: number;
  expiryYear: number;
  eWallet: string;
  nameOnCard: string;
};

export const getPaymentMethodsCustomersById = async (
  id: string
): Promise<PaymentMethodsByCustomerType[]> => {
  try {
    const { data } = await api.get<{
      payments: PaymentMethodsByCustomerType[];
    }>(`/customers/${id}/paymentmethods`);

    return data.payments;
  } catch (error) {
    return error;
  }
};
