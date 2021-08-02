import { bindActionCreators } from 'redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import React, { useState, useEffect, useMemo } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { fetchData } from './actions/nodesActionCreators';
import { metricsFetchData } from './actions/metricsActionCreators';
import AlertsPage from './pages/AlertsPage';
import CustomMetricsPage from './pages/CustomMetricsPage';
import GetStartedPage from './pages/GetStartedPage';
import Layout from './components/Layout';
import MetricsPage from './pages/MetricsPage';
import NotFoundPage from './pages/NotFoundPage';
import StructurePage from './pages/StructurePage';

function App({ fetchData, metricsFetchData }) {
  const [darkMode, setDarkMode] = useState(false);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  // On intial load, perform all fetch requests to populate our app with data
  useEffect(() => fetchData(), []);
  useEffect(() => metricsFetchData(), []);
  // Checks user settings for dark mode preference
  useEffect(() => {
    prefersDarkMode ? setDarkMode(true) : setDarkMode(false);
  }, [prefersDarkMode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: '#fff',
            light: '#fff',
            dark: '#b2b2b2',
            contrastText: '#000',
            accent: '#923f2e',
          },
          secondary: {
            main: '#000',
            light: '#333',
            dark: '#000',
            contrastText: '#ffffff',
          },
          common: {
            defaultDarkBackground: '#303030',
            defaultLightBackground: '#f5f5f5',
          },
          type: darkMode ? 'dark' : 'light',
        },
      }),
    [darkMode]
  );

  const toggleDarkMode = () => setDarkMode(!darkMode);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {/* Layout produces our AppBar and left Drawer */}
        <Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
          <Switch>
            <Route exact path="/" component={GetStartedPage} />
            <Route path="/structure" component={StructurePage} />
            <Route path="/metrics" component={MetricsPage} />
            <Route path="/custom" component={CustomMetricsPage} />
            <Route path="/alerts" component={AlertsPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchData, metricsFetchData }, dispatch);

export default connect(null, mapDispatchToProps)(App);
