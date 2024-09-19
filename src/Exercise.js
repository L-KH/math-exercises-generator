import React, { useState, useEffect } from 'react';
import { MathJax } from 'better-react-mathjax';
import { Button, Paper, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const Exercise = ({ exercise, index }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    setShowAnswer(false);
  }, [exercise]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Paper elevation={3} className="exercise" style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h6">Exercise {index + 1}</Typography>
        <Typography>
          <strong>{exercise.questionText} </strong>
          <MathJax inline>{`\\(${exercise.question}\\)`}</MathJax>
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowAnswer(!showAnswer)}
          style={{ marginTop: '10px' }}
        >
          {showAnswer ? 'Hide Answer' : 'Show Answer'}
        </Button>
        {showAnswer && (
          <div
            style={{ 
              marginTop: '10px', 
              backgroundColor: '#e8f5e9',
              padding: '10px',
              borderRadius: '4px'
            }}
          >
            <Typography>
              <strong>Answer:</strong> <MathJax inline>{`\\(${exercise.answer}\\)`}</MathJax>
            </Typography>
          </div>
        )}
      </Paper>
    </motion.div>
  );
};

export default Exercise;
