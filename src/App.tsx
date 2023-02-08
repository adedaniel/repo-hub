import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { defaultTheme, ThemeProvider, Preflight } from '@xstyled/emotion';

import HomePage from '@/pages/home';
import PageNotFound from '@/pages/404';

const theme = {
  ...defaultTheme,
};

const App: React.FC<{}> = () => {
  return (
    <ThemeProvider theme={theme}>
      <Preflight />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
