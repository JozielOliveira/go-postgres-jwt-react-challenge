import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useAdmin } from 'hooks/Admin';
import { FixMeLate } from 'types';

export type RouteType = {
  name: string;
  path: string;
  exact: boolean;
  component: FixMeLate;
  isPrivate: boolean;
};

export interface RouterProps {
  routes: RouteType[];
}

const RouterContext = React.createContext<RouterProps>({ routes: [] });

export const Router: React.FC<RouterProps> = ({ routes }) => {
  const { isLogged } = useAdmin();

  return (
    <RouterContext.Provider value={{ routes }}>
      <BrowserRouter>
        <Switch>
          {routes
            .filter((r) => !r.isPrivate || r.isPrivate === isLogged)
            .map((route, index: number) => (
              // eslint-disable-next-line react/no-array-index-key
              <Route key={index} {...route} />
            ))}
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </BrowserRouter>
    </RouterContext.Provider>
  );
};

export const useRouter = () => {
  const context = useContext<RouterProps>(RouterContext);

  return context;
};
