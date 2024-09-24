import React, { useState } from 'react';
import { Button, Card, CardContent, Typography, Box } from '@mui/material';

const QuizCard = ({ onStartQuiz }) => {
  return (
    <Card className="custom-card">
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
        Es-tu assez fort pour passer le test ?
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
        Mets-toi au défi avec un quiz de 20 questions sur le développement et la factorisation des expressions, y compris les identités remarquables.
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => onStartQuiz('easy')}
            sx={{ mr: 2 }}
          >
            Facile
          </Button>
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={() => onStartQuiz('normal')}
            sx={{ mr: 2 }}
          >
            Normal
          </Button>
          <Button 
            variant="contained" 
            color="error" 
            onClick={() => onStartQuiz('hard')}
          >
            Difficile
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default QuizCard;
