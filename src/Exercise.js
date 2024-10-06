import React, { useState, useEffect } from 'react';
import { Button, Paper, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const Exercise = ({ exercise, index }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    setShowAnswer(false);
  }, [exercise]);

  const isLevel8 = exercise.level === 8; // Assuming you pass the level as a prop

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Paper elevation={3} className="exercise" style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h6">Exercice {index + 1}</Typography>
        <Typography>
          <strong style={{ fontSize: '16px' }}>{exercise.questionText}</strong>
          <BlockMath math={exercise.question} />
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowAnswer(!showAnswer)}
          style={{ marginTop: '1px' }}
        >
          {showAnswer ? 'Cacher la Réponse' : 'Afficher la Réponse'}
        </Button>
        {showAnswer && (
  <div
    style={{ 
      marginTop: '10px', 
      backgroundColor: '#e6ffe6',
      padding: '10px',
      borderRadius: '4px',
      maxWidth: '100%',
      maxHeight: '200px',
      overflowY: 'auto',
      overflowX: 'hidden'
    }}
  >
    <Typography>
      <strong>Réponse :</strong>
      <BlockMath math={exercise.answer} />
    </Typography>
  </div>
)}

      </Paper>
    </motion.div>
  );
};

export default Exercise;
