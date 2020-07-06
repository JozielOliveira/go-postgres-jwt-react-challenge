import { api } from './index';

export type UserType = {
  name: string;
  email: string;
};

export const register = async (params: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await api.post('/register', params);

    return response;
  } catch (error) {
    return error;
  }
};

export type LoginResponseType = { token: string; user: UserType } | undefined;

export const login = async (params: {
  email: string;
  password: string;
}): Promise<LoginResponseType> => {
  try {
    const { data } = await api.post<LoginResponseType>('/login', params);

    return data;
  } catch (error) {
    return error;
  }
};
