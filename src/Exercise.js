import React, { useState, useEffect } from 'react';
import { Button, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';
import './PlanStyles.css';  // Import the shared styles

const Exercise = ({ exercise, index, className }) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    setShowAnswer(false);
  }, [exercise]);

  // Helper function to handle SVG content
  const renderAnswer = () => {
    if (exercise.answer.includes('svg-container')) {
      // Split at the double backslash followed by SVG content
      const parts = exercise.answer.split('\\\\');
      return (
        <div>
          <BlockMath math={parts[0]} />
          <div 
            dangerouslySetInnerHTML={{ 
              __html: parts[1].replace(/&lt;/g, '<').replace(/&gt;/g, '>') 
            }} 
          />
        </div>
      );
    } else {
      return <BlockMath math={exercise.answer} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={className}
    >
      <Paper 
        elevation={3} 
        className="exercise" 
        style={{ 
          padding: isMobile ? '15px' : '20px', 
          marginBottom: '20px',
          overflowX: 'hidden'  // Prevent horizontal scroll on the entire card
        }}
      >
        <Typography 
          variant="h6" 
          style={{ fontSize: isMobile ? '1rem' : '1.25rem' }}
        >
          Exercice {index + 1}
        </Typography>
        
        <Typography component="div">
          <strong style={{ fontSize: isMobile ? '0.95rem' : '16px' }}>
            {exercise.questionText}
          </strong>
          
          {exercise.isTextQuestion ? (
            <Typography 
              style={{ 
                marginTop: '10px', 
                marginBottom: '10px',
                fontSize: isMobile ? '0.9rem' : '1rem',
                wordBreak: 'break-word'
              }}
            >
              {exercise.question}
            </Typography>
          ) : (
            <div className="complex-equation-container">
              <BlockMath math={exercise.question} />
            </div>
          )}
        </Typography>
        
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowAnswer(!showAnswer)}
          style={{ 
            marginTop: '1px',
            fontSize: isMobile ? '0.8rem' : '0.875rem',
            padding: isMobile ? '6px 10px' : '8px 16px'
          }}
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
              maxHeight: isMobile ? '150px' : '200px',
              overflowY: 'auto',
              overflowX: 'hidden'
            }}
          >
            <Typography component="div">
              <strong style={{ fontSize: isMobile ? '0.9rem' : '1rem' }}>Réponse :</strong>
              <div className="complex-equation-container">
                {renderAnswer()}
              </div>
            </Typography>
          </div>
        )}
      </Paper>
    </motion.div>
  );
};

export default Exercise;