import React, { Suspense } from 'react';
import CssBaseLine from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import { Router, AdminProvider } from 'hooks';
import { routes } from './router';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#97a9bd',
      contrastText: 'white',
    },
    secondary: {
      main: '#78b5ec',
    },
    text: {
      primary: '#6d7275',
      hint: '#ffff',
    },
  },
});

function App() {
  return (
    <AdminProvider>
      <ThemeProvider theme={theme}>
        <CssBaseLine />
        <Suspense fallback={<>Loading...</>}>
          <Router routes={routes} />
        </Suspense>
      </ThemeProvider>
    </AdminProvider>
  );
}

export default App;
