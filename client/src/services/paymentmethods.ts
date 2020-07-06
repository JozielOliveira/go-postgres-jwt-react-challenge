import { api } from './index';

export type CreatePaymentMethods = {
  customerId: number;
  methodType: string;
  cardBin: string;
  cardLastFour: string;
  expiryMonth: number;
  expiryYear: number;
  eWallet: string;
  nameOnCard: string;
  billingAddress: {
    country: string;
    postalCode: string;
    latitude: number;
    longitude: number;
    addresseeName: string;
    street1: string;
    street2: string;
    neighborhood: string;
    zone: string;
    city: string;
    region: string;
    poBoxNumber: string;
  };
};

type CreateCustomerResponseType = { paymentID: number };

export const createPaymentmethods = async (
  params: CreatePaymentMethods
): Promise<CreateCustomerResponseType> => {
  try {
    const { data } = await api.post<CreateCustomerResponseType>(
      '/paymentmethods',
      params
    );

    return data;
  } catch (error) {
    return error;
  }
};

