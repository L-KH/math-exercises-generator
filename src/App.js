// App.js
import React, { useState, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MathJaxContext } from 'better-react-mathjax';
import MainPage from './MainPage';
import ExerciseGenerator from './ExerciseGenerator';
import ExerciseGeneratorPuissance from './ExercicesGenerator_puissance&racine';
import Navbar from './Navbar';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);

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
              </Routes>
            </div>
          </div>
        </Router>
      </MathJaxContext>
    </ThemeProvider>
  );
}

export default App;
