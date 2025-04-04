// App.js (Updated with Repère dans le Plan)
import React, { useState, useMemo, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MathJaxContext } from 'better-react-mathjax';
import MainPage from './MainPage';
import CoursesPage from './CoursesPage';
import ExerciseGenerator from './ExerciseGenerator';
import ExerciseGeneratorPuissance from './ExercicesGenerator_puissance&racine';
import ExercicesGenerator_racines from './ExercicesGenerator_racines';
import ExerciseGeneratorPlan from './ExercicesGenerator_plan'; // Import the new component
import Navbar from './Navbar';
import './App.css';
import ReactGA from 'react-ga4';
import { Analytics } from '@vercel/analytics/react';
import ClassroomSimulator from './ClassroomSimulator';
import ClassSelector from './ClassSelector';
import ExamGenerator from './ExamGenerator';
import ExerciseGeneratorEquations from './ExercicesGenerator_equations'
import ExerciseGeneratorDroite from './ExercicesGenerator_droite'


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
                <Route path="/repere-plan" element={<ExerciseGeneratorPlan />} /> {/* Add new route */}
                <Route path="/simulator" element={<ClassSelector />} />
                <Route path="/simulator/class/:classNumber" element={<ClassroomSimulator />} />
                <Route path="/courses/:subject" element={<CoursesPage />} />
                <Route path="/exam" element={<ExamGenerator />} />
                <Route path="/equations-inequations" element={<ExerciseGeneratorEquations />} />
                <Route path="/equation-droite" element={<ExerciseGeneratorDroite />} />
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