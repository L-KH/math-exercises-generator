// App.js
import React, { useState, useMemo, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MathJaxContext } from 'better-react-mathjax';
import MainPage from './MainPage';
import ExerciseGenerator from './ExerciseGenerator';
import ExerciseGeneratorPuissance from './ExercicesGenerator_puissance&racine';
import ExercicesGenerator_racines from './ExercicesGenerator_racines';
import Navbar from './Navbar';
import './App.css';
import ReactGA from 'react-ga4';
import { Analytics } from '@vercel/analytics/react';


function App() {
  const [darkMode, setDarkMode] = useState(false);

  ReactGA.initialize('G-BREBK5DV0J');
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }, []);
  
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
          primary: {
            main: darkMode ? '#90caf9' : '#1976d2',
          },
          secondary: {
            main: darkMode ? '#f48fb1' : '#dc004e',
          },
        },
      }),
    [darkMode]
  );

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MathJaxContext>
        <Router>
          <div className="App" style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <div style={{ flex: 1, padding: '20px' }}>
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/developpement-factorisation" element={<ExerciseGenerator />} />
                <Route path="/puissances-racines" element={<ExerciseGeneratorPuissance />} />
                <Route path="/racines" element={<ExercicesGenerator_racines />} />
              </Routes>
            </div>
          </div>
        </Router>
      </MathJaxContext>
    </ThemeProvider>
    <Analytics />
    </>
  );
}

export default App;
