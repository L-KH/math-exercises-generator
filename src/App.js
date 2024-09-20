import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ExerciseGenerator from './ExerciseGenerator';
import './App.css';
import { MathJaxContext } from 'better-react-mathjax'; // Add this import


const theme = createTheme({
  palette: {
    primary: {
      main: '#4a148c',
    },
    secondary: {
      main: '#ff6f00',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 'bold',
          color: 'white', // Ensure text is visible on colored backgrounds
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MathJaxContext> {/* Add this wrapper */}
        <div className="App" style={{
          minHeight: '100vh',
          padding: '20px',
        }}>
          <ExerciseGenerator />
        </div>
      </MathJaxContext>
    </ThemeProvider>
  );
}

export default App;