import React, { useContext, useState } from 'react';
import { createCookie, deleteCookie } from 'services/utils';
import { api, LoginResponseType, UserType } from 'services';
import { useOnMount } from 'hooks/Effects';
import { FixMeLate } from 'types';

export interface AdminProps {
  user?: UserType;
  isLogged: boolean;
  setUser: (user: LoginResponseType) => FixMeLate;
  removeUser: () => FixMeLate;
}

const AdminContext = React.createContext<AdminProps>({
  isLogged: false,
  setUser: async () => true,
  removeUser: async () => true,
});

export const AdminProvider: React.FC = ({ children }) => {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [admin, setAdmin] = useState<UserType>();

  const setUser = (params: LoginResponseType) => {
    if (params) {
      setAdmin(params.user);
      if (params.token) createCookie('token', params.token, 30);
      setIsLogged(true);
    }

    return true;
  };

  const removeUser = () => {
    deleteCookie('token');
    setIsLogged(false);
  };

  const initial = async () => {
    const { data }: FixMeLate = await api.get('/session');

    if (!data.success) removeUser();
    else {
      setIsLogged(true);
      setAdmin(data.user);
    }
  };

  useOnMount(() => initial());

  return (
    <AdminContext.Provider
      value={{ user: admin, setUser, removeUser, isLogged }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext<AdminProps>(AdminContext);

  return context;
};
